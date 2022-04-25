"""
Module that is used to train the CNNs that power Indoor Scene Detector.

Notes:
- We ran this script in a Kaggle notebook in order to utilize the free GPU.
- The paths to the data set below are absolute paths on Kaggle.  
- TODO: Add Kaggle notebook link
"""

import torch
import torch.nn as nn

from torchvision import transforms, datasets
from torch.utils.data import random_split, DataLoader
from training import (
    SimpleCNN,
    train_model,
    get_custom_alexnet,
    get_custom_densenet121,
    get_custom_resnet18,
)

# random seed
SEED = 42
torch.manual_seed(SEED)

# img and batch sizes
IMG_SIZE = (256, 256)
BATCH_SIZE = 64

# train, val, test split
SPLIT = [4500, 600, 561]

# model training variables
CRITERION = nn.CrossEntropyLoss()
EPOCHS = 25
PATIENCE = 5

# set device
DEVICE = "cuda" if torch.cuda.is_available() else "cpu"

# kaggle absolute path - full dataset
# DATA_PATH = "../input/indoor-scenes-cvpr-2019/indoorCVPR_09/Images/"

# kaggle absolute path - reduced dataset
DATA_PATH = "../input/top10indoorscenes/reduced-indoor-scenes/images/"

TRANSFORMS = transforms.Compose(
    [
        transforms.Resize(IMG_SIZE),
        transforms.ToTensor(),
    ]
)

# load data, split, get loaders
dataset = datasets.ImageFolder(DATA_PATH, transform=TRANSFORMS)
n_classes = len(dataset.classes)
train_set, val_set, test_set = random_split(dataset, SPLIT)
trainloader = DataLoader(
    train_set, BATCH_SIZE, shuffle=True, num_workers=2, pin_memory=True
)
validloader = DataLoader(val_set, BATCH_SIZE, num_workers=2, pin_memory=True)

# models to train
cnn_models = {
    "Simple_CNN": SimpleCNN(),
    "ResNet18_Tuned": get_custom_resnet18(
        n_classes=n_classes, pretrained=True, freeze=False
    ),
    "AlexNet_Tuned": get_custom_alexnet(
        n_classes=n_classes, pretrained=True, freeze=False
    ),
    "DenseNet121_Tuned": get_custom_densenet121(
        n_classes=n_classes, pretrained=True, freeze=False
    ),
}

# to track all training and validation losses and accuracies
train_losses, train_accs = {}, {}
valid_losses, valid_accs = {}, {}

# train models
for name, model in cnn_models.items():
    print(f"{name} training started...")
    print(
        "===================================================================================================="
    )

    model.to(DEVICE)
    optimizer = torch.optim.Adam(model.parameters())

    tuned_model, train_loss, train_acc, valid_loss, valid_acc = train_model(
        model=model,
        device=DEVICE,
        criterion=CRITERION,
        optimizer=optimizer,
        trainloader=trainloader,
        validloader=validloader,
        epochs=EPOCHS,
        patience=PATIENCE,
        save=True,
        name=f"{name}",
    )

    cnn_models[name] = tuned_model
    train_losses[name] = train_loss
    train_accs[name] = train_acc
    valid_losses[name] = valid_loss
    valid_accs[name] = valid_acc

    print(
        "====================================================================================================\n"
    )
