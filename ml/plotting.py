import torch
import numpy as np
import matplotlib.pyplot as plt

from prediction import get_prediction
from captum.attr import Occlusion
from captum.attr import visualization as viz


def visualize_model(model, dl, device, num_images=6):
    """Visualize predictions from a PyTorch model via a DataLoader.

    Note: This function is intended for use with assessing model predictions
          rather than real time inference.

    Parameters
    ----------
    model : torch.nn.Module
        A trained PyTorch model.
    dl : torch.utils.data.DataLoader
        A PyTorch DataLoader.
    device : str
        The current device ("cpu" or "cuda")
    num_images : int, optional
        Number of images to plot (must be even)
    """

    if num_images % 2 != 0:
        raise ValueError("num_images must be positive")

    plotted = 0
    class_names = dl.dataset.dataset.classes
    fig, axes = plt.subplots(num_images // 2, 2, figsize=(15, 15))

    if model.training:
        model.eval()

    with torch.no_grad():
        for inputs, labels in dl:
            inputs, labels = inputs.to(device), labels.to(device)

            outputs = model(inputs)
            probs = torch.softmax(outputs, 1)
            pred_probs, pred_labels = torch.max(probs, 1)

            for j in range(inputs.size()[0]):
                img = inputs[j].permute(1, 2, 0)
                label = class_names[labels[j]]
                pred_label = class_names[pred_labels[j].item()]
                pred_prob = pred_probs[j].item()

                title = f"Predicted: {pred_label}\nActual: {label}\n Probability: {pred_prob:.5f}"

                axes[plotted // 2, plotted % 2].imshow(img)
                axes[plotted // 2, plotted % 2].axis("off")
                axes[plotted // 2, plotted % 2].set_title(title)

                plotted += 1

                if plotted == num_images:
                    plt.tight_layout()
                    return


def get_numpy_3d(img_tensor):
    """Convert an image from 4d PyTorch Tensor (B, C, H, W) to 3d NumPy Array (H, W, C).

    Parameters
    ----------
    img_tensor : torch.Tensor
        Image represented as a 4d PyTorch tensor.
        Dimensions must be (batch, channel, height, width).

    Returns
    -------
    np.array
        Image represented as a 3D NumPy array.
        Dimensions are (height, width, channel).
    """
    return np.transpose(img_tensor.squeeze().cpu().detach().numpy(), (1, 2, 0))
