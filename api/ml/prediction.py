import os
import io
import json
import torch
import base64
from torch.hub import load_state_dict_from_url
from training import (
    SimpleCNN,
    get_custom_alexnet,
    get_custom_densenet121,
    get_custom_resnet18,
)

from PIL import Image
from torchvision import transforms

CURRENT_DIR = os.path.abspath(os.path.dirname(__file__))
WEIGHT_DIR = os.path.join(CURRENT_DIR, "weights")
WEIGHT_URLS = os.path.join(CURRENT_DIR, "weight_urls.json")
DEVICE = "cuda" if torch.cuda.is_available() else "cpu"


def b64_to_bytes(img_b64):
    """Decodes an image from base64 -> bytes

    Parameters
    ----------
    img_b64 : string
        base64 encoding of image.

    Returns
    -------
    img_bytes
        Byte representation of the image.
    """

    img_b64 = img_b64.split(",")[1]
    img_bytes = base64.b64decode(img_b64)
    return img_bytes


def transform_image(img_bytes):
    """Transforms an image from bytes -> PyTorch Tensor.

    Parameters
    ----------
    img_bytes : bytes
        Byte representation of the image.

    Returns
    -------
    img_tensor : torch.Tensor
        PyTorch Tensor representation of the image.
    """
    # TODO: update size at the end with final
    img_size = (256, 256)
    img = Image.open(io.BytesIO(img_bytes))

    img_transforms = transforms.Compose(
        [transforms.Resize(img_size), transforms.ToTensor()]
    )

    # transform and remove batch dim
    img_tensor = img_transforms(img).unsqueeze(0)

    return img_tensor


def read_and_transform_image(img_path):
    """Read in an image from a file (e.g. jpg) -> PyTorch Tensor.

    Parameters
    ----------
    img_path : str
        The path to the image.

    Returns
    -------
    img_tensor : torch.Tensor
        PyTorch Tensor representation of the image.
    """
    with open(img_path, "rb") as f:
        img_bytes = f.read()
        img_tensor = transform_image(img_bytes=img_bytes)

    return img_tensor


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


def load_weights(model, weights, mode="eval"):
    """Loads pre-trained weights into a PyTorch model."""

    model.load_state_dict(weights)

    # switch to eval mode if desired
    if mode == "eval":
        model.eval()


def _get_weights_s3():
    """Gets model weights from AWS S3 bucket.

    Returns
    -------
    model_weights : dict
        Dictionary of model weights, key: model name, value: weights.
    """

    model_weights = {}

    with open(WEIGHT_URLS) as f:
        weight_dict = json.load(f)

    for model, url in weight_dict.items():
        model_weights[model] = load_state_dict_from_url(
            url=url,
            map_location=torch.device("cpu"),
            progress=False,
        )

    return model_weights


def load_models(mode="eval"):
    """Loads all models into a dictionary.

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
        if model == "eval":
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
    pred_probs, pred_labels, pred_classes : tensor, tensor, list
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

    return pred_probs, pred_labels, pred_classes


if __name__ == "__main__":

    load_models()
