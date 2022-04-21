"""
This is the test module for the scripts in ml.
"""
import os
import io
import torch
import torchvision
import base64
import pytest

from PIL import Image
from torchvision import transforms
from matplotlib.figure import Figure
from ml import utils, training, prediction


def get_test_image_bytes():
    """Generates image bytes to use for tests below."""
    path = os.path.abspath(os.path.dirname(__file__))
    with open(f"{path}/test_img.jpg", "rb") as f:
        test_img_bytes = f.read()

    return test_img_bytes


def get_test_image_tensor():
    """Generates a image Tensor to use for tests below."""
    # wrangle example image
    img_size = (256, 256)
    img_bytes = get_test_image_bytes()
    img = Image.open(io.BytesIO(img_bytes))
    img_transforms = transforms.Compose(
        [transforms.Resize(img_size), transforms.ToTensor()]
    )
    test_img_tensor = img_transforms(img).unsqueeze(0)

    return test_img_tensor


def test_b64_to_bytes():
    test_img_bytes = get_test_image_bytes()
    test_img_b64 = base64.b64encode(test_img_bytes)
    assert utils.b64_to_bytes(test_img_b64, fe=False) == test_img_bytes


def test_bytes_to_b64():
    test_img_bytes = get_test_image_bytes()
    assert utils.bytes_to_b64(test_img_bytes) == base64.b64encode(test_img_bytes)


def test_bytes_to_tensor():
    test_img_bytes = get_test_image_bytes()
    img_tensor = utils.bytes_to_tensor(test_img_bytes)

    assert type(img_tensor) == torch.Tensor
    assert img_tensor.dim() == 4


def test_file_to_tensor():
    path = os.path.abspath(os.path.dirname(__file__))
    img_path = f"{path}/test_img.jpg"
    img_tensor = utils.file_to_tensor(img_path)

    assert type(img_tensor) == torch.Tensor
    assert img_tensor.dim() == 4


def test_fig_to_bytes():
    fig = Figure()
    fig_bytes = utils.fig_to_bytes(fig)

    assert type(fig_bytes) == bytes


def test_simple_cnn():
    cnn = training.SimpleCNN()
    img_tensor = get_test_image_tensor()
    x = cnn.forward(img_tensor)
    output = cnn(img_tensor)

    assert type(cnn.features) == torch.nn.Sequential
    assert type(cnn.classifier) == torch.nn.Sequential
    assert type(x) == torch.Tensor
    assert x.shape == (1, 10)
    assert type(output) == torch.Tensor
    assert output.shape == (1, 10)


def test_freeze_parameters():
    cnn = training.SimpleCNN()
    training.freeze_parameters(cnn)

    for param in cnn.parameters():
        assert param.requires_grad == False


def test_custom_alexnet():
    alexnet = training.get_custom_alexnet(10)
    assert type(alexnet) == type(torchvision.models.alexnet(progress=False))


def test_custom_densenet121():
    densenet121 = training.get_custom_densenet121(10)
    assert type(densenet121) == type(torchvision.models.densenet121(progress=False))


def test_custom_resnet18():
    resnet18 = training.get_custom_resnet18(10)
    assert type(resnet18) == type(torchvision.models.resnet18(progress=False))


def test_get_class_mapper():
    class_mapper = prediction.get_class_mapper()

    assert len(class_mapper) == 10
    assert type(class_mapper) == dict


def test_get_prediction():
    model = training.SimpleCNN()
    img_tensor = get_test_image_tensor()
    pred_prob, pred_label, pred_class = prediction.get_prediction(model, img_tensor)

    assert type(pred_prob) == float
    assert type(pred_label) == int
    assert type(pred_class) == str


def test_topk_predictions():
    k = 3
    model = training.SimpleCNN()
    img_tensor = get_test_image_tensor()

    pred_probs, pred_labels, pred_classes = prediction.get_topk_predictions(
        model, img_tensor, k
    )

    with pytest.raises(ValueError):
        pred_probs, pred_labels, pred_classes = prediction.get_topk_predictions(
            model, img_tensor, 100
        )

    assert type(pred_probs) == list
    assert type(pred_labels) == list
    assert type(pred_classes) == list
    assert len(pred_probs) == k
    assert len(pred_labels) == k
    assert len(pred_classes) == k
