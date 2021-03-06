"""
Module that contains functions related to model prediction.
"""

import os
import json
import torch
from torch.hub import load_state_dict_from_url
from .training import (
    SimpleCNN,
    get_custom_alexnet,
    get_custom_densenet121,
    get_custom_resnet18,
)

DEVICE = "cuda" if torch.cuda.is_available() else "cpu"
CURRENT_DIR = os.path.abspath(os.path.dirname(__file__))
WEIGHTS = {
    "AlexNet_Tuned": "https://cnn-dashboard-weights.s3.us-west-2.amazonaws.com/AlexNet_Tuned.pth",
    "DenseNet121_Tuned": "https://cnn-dashboard-weights.s3.us-west-2.amazonaws.com/DenseNet121_Tuned.pth",
    "ResNet18_Tuned": "https://cnn-dashboard-weights.s3.us-west-2.amazonaws.com/ResNet18_Tuned.pth",
    "Simple_CNN": "https://cnn-dashboard-weights.s3.us-west-2.amazonaws.com/Simple_CNN.pth",
}


def get_class_mapper():
    """Gets mapper from class label to class name.

    Returns
    -------
    class mapper : dict
        Mapper from class label (key) to class name (value)
    """
    path = os.path.join(CURRENT_DIR, "class_mapper.json")
    class_mapper = json.load(open(path))
    return class_mapper


def _get_weights_s3(weight_dict=WEIGHTS):
    """Gets model weights from AWS S3 bucket.

    Parameters
    ----------
    weight_dict : dict
        Dictionary containing model names (keys) and s3
        bucket weight urls (value).

    Returns
    -------
    model_weights : dict
        Dictionary of model weights, key: model name, value: weights.
    """
    model_weights = {}

    # download and save weights from aws s3 bucket
    for model, url in weight_dict.items():
        model_weights[model] = load_state_dict_from_url(
            url=url,
            map_location=torch.device("cpu"),
            progress=False,
        )

    return model_weights


def load_models(mode="eval"):
    """Loads all trained models into a dictionary.

    Parameters
    ----------
    mode : str, optional
        The mode the model should be in, by default "eval".

    Returns
    -------
    models
        Dictionary of models, key: model name, value: PyTorch model.
    """
    models = {}
    n_classes = len(get_class_mapper())
    model_weights = _get_weights_s3()

    for name, weights in model_weights.items():
        network, _ = [x.lower() for x in name.split("_")]  # network name

        # get the correct model
        if network == "alexnet":
            model = get_custom_alexnet(n_classes, pretrained=False)
        elif network == "densenet121":
            model = get_custom_densenet121(n_classes, pretrained=False)
        elif network == "resnet18":
            model = get_custom_resnet18(n_classes, pretrained=False)
        elif network == "simple":
            model = SimpleCNN()

        # load in weights
        model.load_state_dict(weights)

        # switch to inference mode
        if mode == "eval":
            model.eval()

        models[name.lower()] = model

    return models


def get_prediction(model, img_tensor):
    """Performs prediction for a multiclass image classification problem.

    Parameters
    ----------
    model : PyTorch CNN
        Trained PyTorch CNN for prediction.
    img_tensor : torch.Tensor
        PyTorch Tensor representation of the image to classify.

    Returns
    -------
    pred_prob, pred_label, pred_class : float, int, str
        Prediction probability, integer label and class name.
    """
    class_mapper = get_class_mapper()

    if model.training:
        model.eval()

    with torch.no_grad():
        outputs = model(img_tensor)
        probs = torch.softmax(outputs, 1)
        pred_prob, pred_label = torch.max(probs, 1)
        pred_prob, pred_label = pred_prob.item(), pred_label.item()
        pred_class = class_mapper[str(pred_label)]

    return pred_prob, pred_label, pred_class


def get_topk_predictions(model, img_tensor, k=2):
    """Top k prediction for a multiclass image classification problem.

    Parameters
    ----------
    model : PyTorch CNN
        Trained PyTorch CNN for prediction.
    img_tensor : torch.Tensor
        PyTorch Tensor representation of the image to classify.
    k : int, optional
        The number of prediction outputs to return.

    Returns
    -------
    pred_probs, pred_labels, pred_classes : list, list, list
        The k probabilities, labels, and classes predicted, sorted in
        descending order from most likely to least likely.
    """
    class_mapper = get_class_mapper()

    if k > len(class_mapper):
        raise ValueError("k must be <= # of classes")

    if model.training:
        model.eval()

    with torch.no_grad():
        outputs = model(img_tensor)
        probs = torch.softmax(outputs, 1)
        pred_probs, pred_labels = torch.topk(probs, k=k, dim=1, sorted=True)
        pred_classes = [class_mapper[str(i.item())] for i in pred_labels.squeeze()]

    # convert probs and labels from tensor to list
    pred_probs, pred_labels = pred_probs.tolist()[0], pred_labels.tolist()[0]

    return pred_probs, pred_labels, pred_classes


def wrangle_topk_predictions(pred_probs, pred_labels, pred_classes):
    """Helper function to wrangle predictions to cleaner data structure for FE."""
    predictions = []

    for prob, label, class_name in zip(pred_probs, pred_labels, pred_classes):
        predictions.append({"prob": prob, "label": label, "class": class_name})

    return predictions
