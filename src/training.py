import time
import torch
import torch.nn as nn
from torchvision import models
from copy import deepcopy


class SimpleCNN(nn.Module):
    """Custom CNN for the indoor scenes dataset

    Note: Assumes input size of 256 x 256 x 3.
    """

    def __init__(self):
        super().__init__()

        self.features = nn.Sequential(
            nn.Conv2d(3, 64, kernel_size=5, stride=1, padding=2),
            nn.ReLU(inplace=True),
            nn.MaxPool2d(kernel_size=2),
            nn.Conv2d(64, 128, kernel_size=3, padding=1),
            nn.ReLU(inplace=True),
            nn.MaxPool2d(kernel_size=2),
            nn.Conv2d(128, 256, kernel_size=3, padding=1),
            nn.ReLU(inplace=True),
            nn.MaxPool2d(kernel_size=2),
            nn.Conv2d(256, 128, kernel_size=2, padding=1),
            nn.ReLU(inplace=True),
            nn.Conv2d(128, 64, kernel_size=2),
            nn.ReLU(inplace=True),
            nn.Conv2d(64, 64, kernel_size=3, padding=1),
            nn.ReLU(inplace=True),
            nn.MaxPool2d(kernel_size=2),
        )
        self.classifier = nn.Sequential(
            nn.Linear(64 * 16 * 16, 32),
            nn.ReLU(inplace=True),
            nn.Linear(32, 16),
            nn.ReLU(inplace=True),
            nn.Linear(16, 10),
        )

    def forward(self, x):
        x = self.features(x)
        x = torch.flatten(x, 1)
        x = self.classifier(x)
        return x


# to add: scheduler
def train_model(
    model,
    device,
    criterion,
    optimizer,
    trainloader,
    validloader,
    epochs=1,
    patience=None,
    verbose=True,
    save=False,
    name=None,
):
    """Training function for PyTorch CNN for multiclass classification."""
    since = time.time()

    # move model to GPU
    model.to(device)

    # to track and save best model
    best_model_wts = deepcopy(model.state_dict())
    best_acc = 0.0
    best_epoch = 0

    # to track train and validation losses and accuracy
    train_loss, train_acc = [], []
    valid_loss, valid_acc = [], []

    for epoch in range(epochs):
        train_batch_loss, train_batch_acc = 0, 0
        valid_batch_loss, valid_batch_acc = 0, 0

        # set model to training mode
        model.train()

        for inputs, labels in trainloader:
            # move to GPU if available
            inputs, labels = inputs.to(device), labels.to(device)

            # zero parameter gradients
            optimizer.zero_grad()

            # forward propagation and calc batch train loss
            outputs = model(inputs)
            loss = criterion(outputs, labels)
            train_batch_loss += loss.item()

            # convert to probabilities and calc batch train accuracy
            probs = nn.functional.softmax(outputs, 1)
            _, preds = torch.max(probs, 1)
            train_batch_acc += (preds == labels).type(torch.float32).mean().item()

            # backpropagation and update weights
            loss.backward()
            optimizer.step()

        # track training statistics
        train_loss.append(train_batch_loss / len(trainloader))
        train_acc.append(train_batch_acc / len(trainloader))

        # set model to evaluation model
        model.eval()

        with torch.no_grad():
            for inputs, labels in validloader:
                # move to GPU if available
                inputs, labels = inputs.to(device), labels.to(device)

                # forward propagation and calc batch valid loss
                outputs = model(inputs)
                loss = criterion(outputs, labels)
                valid_batch_loss += loss.item()

                # convert to probabilities and calc batch valid accuracy
                probs = nn.functional.softmax(outputs, 1)
                _, preds = torch.max(probs, 1)
                valid_batch_acc += (preds == labels).type(torch.float32).mean().item()

            # track valid statistics
            valid_loss.append(valid_batch_loss / len(validloader))
            valid_acc.append(valid_batch_acc / len(validloader))

        # update best model
        if valid_acc[-1] > best_acc:
            best_acc = valid_acc[-1]
            best_epoch = epoch
            best_model_wts = deepcopy(model.state_dict())

        # print epoch results
        if verbose:
            print(
                f"Epoch {epoch + 1}: ---",
                f"Train Loss: {train_loss[-1]:.4f}.",
                f"Valid Loss: {valid_loss[-1]:.4f}.",
                f"Train Accuracy: {train_acc[-1]:.4f}.",
                f"Valid Accuracy: {valid_acc[-1]:.4f}.",
            )

        # early stopping
        if epoch > 0 and valid_loss[-1] > valid_loss[-2]:
            consec_increases += 1
        else:
            consec_increases = 0
        if consec_increases > patience:
            print(f"Stopped early at Epoch {epoch+1}")
            break

    # print training time and best accuracy
    time_elapsed = time.time() - since
    print(
        "Training complete in {:.0f}m {:.0f}s".format(
            time_elapsed // 60, time_elapsed % 60
        )
    )
    print(f"Best validation accuracy (Epoch {best_epoch+1:.0f}): {best_acc:.4f}")

    # load best model weights
    model.load_state_dict(best_model_wts)

    if save:
        torch.save(model.state_dict(), f"{name}.pth")

    return model, train_loss, train_acc, valid_loss, valid_acc


def freeze_parameters(model):
    """Freeze the parameters in a PyTorch model."""
    for param in model.parameters():
        param.requires_grad = False


def get_custom_alexnet(n_classes, pretrained=False, freeze=False):
    """Get a custom AlexNet to use with the Indoor Scenes dataset."""
    alexnet = models.alexnet(pretrained=pretrained)

    if freeze:
        freeze_parameters(alexnet)

    alexnet.classifier = nn.Sequential(
        nn.Dropout(p=0.5),
        nn.Linear(256 * 6 * 6, 250),
        nn.ReLU(inplace=True),
        nn.Dropout(p=0.5),
        nn.Linear(250, n_classes),
    )

    return alexnet


def get_custom_densenet121(n_classes, pretrained=False, freeze=False):
    """Get a custom DenseNet121 to use with the Indoor Scenes dataset."""
    densenet121 = models.densenet121(pretrained=pretrained)

    if freeze:
        freeze_parameters(densenet121)

    densenet121.classifier = nn.Linear(1024, n_classes)

    return densenet121


def get_custom_resnet18(n_classes, pretrained=False, freeze=False):
    """Get a custom ResNet18 to use with the Indoor Scenes dataset."""
    resnet18 = models.resnet18(pretrained=pretrained)

    if freeze:
        freeze_parameters(resnet18)

    resnet18.fc = nn.Linear(512, n_classes)

    return resnet18


def load_weights(model, path):
    model.load_state_dict(torch.load(path))
    model.eval()
    return model
