import io
import base64
from PIL import Image
from torchvision import transforms


def strip_b64(img_b64):
    """Strip base64 string from front end image upload.

    Parameters
    ----------
    img_b64 : str
        The original base64 string from front end.

    Returns
    -------
    img_b64 : str
        Only the base64 portion of the original string.
    """
    return img_b64.split(",")[1]


def b64_to_bytes(img_b64, fe=True):
    """Convert an image from base64 to bytes.

    Parameters
    ----------
    img_b64 : string
        base64 encoding of image.
    fe : bool
        Whether or not the base64 representation is coming from
        the React FE.  If True, it needs to be wrangled with
        `string_b64`.

    Returns
    -------
    img_bytes
        Byte representation of the image.
    """
    if fe:
        img_b64 = strip_b64(img_b64)

    img_bytes = base64.b64decode(img_b64)
    return img_bytes


def bytes_to_b64(img_bytes):
    """Convert an image from bytes to base64.

    Parameters
    ----------
    img_bytes : bytes

    Returns
    -------
    img_b64 : bytes
        base64 representation of the image.
    """
    img_b64 = base64.b64encode(img_bytes)
    return img_b64


def bytes_to_tensor(img_bytes, batch=False):
    """Transforms an image from bytes to PyTorch Tensor.

    Parameters
    ----------
    img_bytes : bytes
        Byte representation of the image.
    batch : bool
        Whether or not to include PyTorch batch dimension.
        Default is False to remove it.

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
    img_tensor = img_transforms(img)

    if not batch:
        img_tensor = img_tensor.unsqueeze(0)

    return img_tensor


def file_to_tensor(img_path):
    """Read in an image from a file (e.g. jpg) to PyTorch Tensor.

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
        img_tensor = bytes_to_tensor(img_bytes=img_bytes)

    return img_tensor


def fig_to_bytes(fig):
    """Convert a Matplotlib Figure to bytes.

    Parameters
    ----------
    fig : Matplotlib Figure
        The figure to convert.

    Returns
    -------
    img_bytes : bytes
        Byte representation of the figure.
    """
    buffer = io.BytesIO()
    fig.savefig(buffer)
    img_bytes = buffer.getvalue()
    return img_bytes
