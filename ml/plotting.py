import torch
import numpy as np
import matplotlib.pyplot as plt

from prediction import get_prediction
from captum.attr import Occlusion, GradientShap
from captum.attr import visualization as viz
from matplotlib.colors import LinearSegmentedColormap

# random seed
SEED = 42

# custom matplotlib color map for some Captum plots
CUSTOM_CMAP = LinearSegmentedColormap.from_list(
    "custom blue", [(0, "#ffffff"), (0.25, "#000000"), (1, "#000000")], N=256
)


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


def get_occlusion_attr(
    model, img_tensor, sliding_window_shapes=(3, 30, 30), strides=(3, 20, 20), **kwargs
):
    """Calculates primary image attributes using the Occlusion Algorithm.

    Parameters
    ----------
    model : PyTorch CNN
        Trained PyTorch CNN.
    img_tensor : torch.Tensor
        The image to calculate primary attributes for.
    sliding_window_shapes : tuple, optional
        Shape of sliding window for the algorithm, by default (3, 30, 30).
    strides : tuple, optional
        Strides for the algorithm, by default (3, 20, 20).

    Returns
    -------
    occlusion_attr: torch.Tensor
        The primary image attributions calculated with Occlusion.
    """
    occlusion = Occlusion(model)

    _, pred_label, _ = get_prediction(model, img_tensor)

    occlusion_attr = occlusion.attribute(
        inputs=img_tensor,
        sliding_window_shapes=sliding_window_shapes,
        strides=strides,
        baselines=0,
        target=pred_label,
        **kwargs,
    )

    return occlusion_attr


def plot_occlusion(occlusion_attr, img_tensor, **kwargs):
    """Plots positive occlusion attributes as a heatmap over an image.

    Parameters
    ----------
    occlusion_attr : torch.Tensor
        The primary image attributions calculated with Occlusion.
    img_tensor : torch.Tensor
        The original image.

    Returns
    -------
    fig : matplotlib.figure.Figure
        Blended heat map of positive attributes and original image.
    """
    fig, _ = viz.visualize_image_attr_multiple(
        attr=get_numpy_3d(occlusion_attr),
        original_image=get_numpy_3d(img_tensor),
        methods=["blended_heat_map"],
        signs=["positive"],
        cmap="jet",
        alpha_overlay=0.35,
        show_colorbar=True,
        **kwargs,
    )

    return fig


def get_grad_shap_attr(model, img_tensor, n_samples=15, stdevs=0.0001, **kwargs):
    """Calculates primary image attributes using the Gradient SHAP Algorithm.

    Parameters
    ----------
    model : PyTorch CNN
        Trained PyTorch CNN.
    img_tensor : torch.Tensor
        The image to calculate primary attributes for.
    n_samples : int, optional
        Number of randomly generated examples for SHAP, by default 15
    stdevs : float, optional
        Std dev of random noise added to examples, by default 0.0001

    Returns
    -------
    grad_shap_attr: torch.Tensor
        The primary image attributions calculated with Gradient SHAP.
    """
    torch.manual_seed(SEED)
    np.random.seed(SEED)

    grad_shap = GradientShap(model)

    _, pred_label, _ = get_prediction(model, img_tensor)

    rand_img_dist = torch.cat([img_tensor * 0, img_tensor * 1])

    grad_shap_attr = grad_shap.attribute(
        img_tensor,
        baselines=rand_img_dist,
        n_samples=n_samples,
        stdevs=stdevs,
        target=pred_label,
        **kwargs,
    )

    return grad_shap_attr


def plot_grad_shap(grad_shap_attr, img_tensor, **kwargs):
    """Plots positive Gradient SHAP attributes of an image.

    Parameters
    ----------
    grad_shap_attr : torch.Tensor
        The primary image attributions calculated with Gradient SHAP.
    img_tensor : torch.Tensor
        The original image.

    Returns
    -------
    fig : matplotlib.figure.Figure
        Heatmap of positive attributes.
    """
    fig, _ = viz.visualize_image_attr_multiple(
        attr=get_numpy_3d(grad_shap_attr),
        original_image=get_numpy_3d(img_tensor),
        methods=["heat_map"],
        signs=["positive"],
        cmap=CUSTOM_CMAP,
        show_colorbar=True,
        **kwargs,
    )

    return fig
