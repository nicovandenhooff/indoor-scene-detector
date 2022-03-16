import torch
from torchvision import datasets
from torch.utils.data import Dataset, Subset, DataLoader
from sklearn.model_selection import train_test_split


class ImageDataset:
    """Streamlines working with image data in PyTorch..

    The `ImageDataset` class is used to simplify the process of reading in,
    transforming, splitting, and obtaining a DataLoader for image data in
    order to set up the data to work with PyTorch.

    Image data must be stored in the format required by the `ImageFolder`
    class in `torchvision.datasets` in order for `ImageDataset` to work
    correctly.

    Parameters
    ----------
    path : str
        The path to the image data.
    train_transform : torchvisions.transforms
        The transformation(s) to apply to the training image data.
    test_transform : torchvisions.transforms
        The transformation(s) to apply to the validation and test image data.
    """

    def __init__(self, path, train_transform, test_transform):
        self.path = path
        self.train_transform = train_transform
        self.test_transform = test_transform
        self.train_images = CustomDataset(path, transform=train_transform)
        self.test_images = CustomDataset(path, transform=test_transform)

    def train_val_test_split(self, train_size, val_size, test_size, seed=None):
        """Performs a train/validation/test split.

        Parameters
        ----------
        train_size : float
            The proportion of training data.
        val_size : _type_
            The proportion of validation data.
        test_size : _type_
            The proportion of test data.
        seed : int
            Random seed for reproducibility.

        Returns
        -------
        train_set, val_set, test_set
            The training, validation, and test datasets.
        """
        self._verify_split(train_size, val_size, test_size)
        index = torch.arange(len(self.train_images))

        # initial split gets training portion of data
        train_idx, temp = train_test_split(
            index, train_size=train_size, random_state=seed
        )

        # split remaining portion into validation and test data
        val_size /= val_size + test_size
        val_idx, test_idx = train_test_split(
            temp, train_size=val_size, random_state=seed
        )

        train_set = Subset(dataset=self.train_images, indices=train_idx)
        val_set = Subset(dataset=self.test_images, indices=val_idx)
        test_set = Subset(dataset=self.test_images, indices=test_idx)

        return train_set, val_set, test_set

    def get_dataloaders(
        self, train_set, val_set, test_set, batch_size, shuffle, **kwargs
    ):
        """Gets PyTorch DataLoaders for train, validation, and test data.

        Parameters
        ----------
        train_set : torch.utils.data.Subset
            The portion of training data.
        val_set : torch.utils.data.Subset
            The portion of validation data.
        test_set : torch.utils.data.Subset
            The portion of test data.
        batch_size : int
            The batch size for each DataLoader.
        shuffle : bool
            Whether or not to shuffle the DataLoader for each epoch.
        **kwargs
            Additional arguments passed to each DataLoader.

        Returns
        -------
        train_loader, val_loader, test_loader
            The three DataLoaders for each dataset.
        """
        train_loader = DataLoader(train_set, batch_size, shuffle, **kwargs)
        val_loader = DataLoader(val_set, batch_size, shuffle, **kwargs)
        test_loader = DataLoader(test_set, batch_size, shuffle, **kwargs)

        return train_loader, val_loader, test_loader

    def _verify_split(self, train_size, val_size, test_size):
        """Verifies that train/validation/test portions add to 1."""
        if train_size + val_size + test_size != 1:
            raise ValueError("Train/validation/test split values must add to 1")


class CustomDataset(Dataset):
    """Custom PyTorch Dataset that lazily applies image transformations.

    The purpose of this class is to facilitate different transformations to
    train, validation, and test portions of data.
    """

    def __init__(self, path, transform=None):
        self.path = path
        self.dataset = datasets.ImageFolder(path)
        self.transform = transform

    def __getitem__(self, i):
        image, label = self.dataset[i][0], self.dataset[i][1]

        if self.transform:
            image = self.transform(image)

        return image, label

    def __len__(self):
        return len(self.dataset)
