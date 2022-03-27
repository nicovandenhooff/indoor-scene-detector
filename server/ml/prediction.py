import os
import io
import json
import torch
import base64

from PIL import Image
from torchvision import transforms

CURRENT_DIR = os.path.abspath(os.path.dirname(__file__))


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


def load_weights(model, path, device, mode="eval"):
    """Loads pre-trained weights into a PyTorch model."""

    # load model with cpu or gpu
    if device == "cpu":
        model.load_state_dict(torch.load(path, map_location=torch.device(device)))
    else:
        model.load_state_dict(torch.load(path))

    # switch to eval mode if desired
    if mode == "eval":
        model.eval()


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
