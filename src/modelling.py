from torchvision import datasets
from torch.utils.data import Dataset, Subset, DataLoader
from sklearn.model_selection import train_test_split


class ImageDataset(Dataset):
    def __init__(self, root, transform=None):
        self.root = root
        self.dataset = datasets.ImageFolder(root)
        self.transform = transform

    def __getitem__(self, i):
        image, label = self.dataset[i][0], self.dataset[i][1]

        if self.transform:
            image = self.transform(image)

        return image, label

    def __len__(self):
        return len(self.dataset)


def train_val_test_split(index, train_size, val_size, test_size):
    val_size /= val_size + test_size
    train_idx, temp = train_test_split(index, train_size=train_size)
    val_idx, test_idx = train_test_split(temp, train_size=val_size)

    return train_idx, val_idx, test_idx


def get_subsets(train_idx, val_idx, test_idx, train_data, val_test_data):
    train_data = Subset(dataset=train_data, indices=train_idx)
    val_data = Subset(dataset=val_test_data, indices=val_idx)
    test_data = Subset(dataset=val_test_data, indices=test_idx)

    return train_data, val_data, test_data


def get_dataloaders(train_data, val_data, test_data, batch_size, shuffle, **kwargs):
    train_loader = DataLoader(train_data, batch_size, shuffle, **kwargs)
    val_loader = DataLoader(val_data, batch_size, shuffle, **kwargs)
    test_loader = DataLoader(test_data, batch_size, shuffle, **kwargs)

    return train_loader, val_loader, test_loader
