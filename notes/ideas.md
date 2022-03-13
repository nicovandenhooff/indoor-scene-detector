# Project Notes

## Example dashboards

- [Places Demo](http://places2.csail.mit.edu/demo.html)
- [Dash DETR Detection App](https://dash.gallery/dash-detr/)
- [Dash Object Detection Explorer](https://dash.gallery/dash-object-detection/)

## Potential datasets

| Dataset                                                                                    | Description                                | Image size              | Pros                              | Cons                                         |
|--------------------------------------------------------------------------------------------|--------------------------------------------|-------------------------|-----------------------------------|----------------------------------------------|
| [MIT Indoor Scenes](https://www.kaggle.com/itsahmad/indoor-scenes-cvpr-2019)               | 15,620 images, 67 classes                  | Not preprocessed        | Organized data, easy tsf learning | May be very hard problem                     |
| [Intel Image Classification](https://www.kaggle.com/puneet6060/intel-image-classification) | 25,000 images, 6 classes                   | 150 x 150               | Very clean data                   | Small size may be problematic for dashboard? |
| [Bird Species](https://www.kaggle.com/gpiosenka/100-bird-species)                          | 58,388 images, 400 species (5 images each) | 224 X 224 X 3           | Cool problem scope                | Only 5 images per class                      |
| [Waste Classification](https://www.kaggle.com/techsash/waste-classification-data)          | 22,564 images, 2 classes                   | Small? Not preprocessed | Relevant topic                    | Binary classification limits dashboard       |
| [Plant Diseases](https://www.kaggle.com/vipoooool/new-plant-diseases-dataset)              | 87,000 images, 38 classes                  | Small, size not listed  | Very "research" oriented          | Narrow problem scope                         |
| [Stanford Dogs](http://vision.stanford.edu/aditya86/ImageNetDogs/)                         | 20,580 images, 120 classes                 | Not preprocessed        | Clean data (kinda)                | Dogs/cats are too common for image work      |

## Ideas for dashboard

- Dropdown/Radio Button to select NN to use for classification
- Dropdown/Radio Button for level of transfer learning (out of the box, last layer tuned, entire model tuned)
- Run button
- Image selector, either image from data set or upload your own image
- Display for current image
- Predictions with probabilities
- Set probability threshold for classification
- Model stats on training/test data set
- Number of layers, nodes etc. for each model
- Explaining the predictions: SHAP, Grad-CAM, Captum (lecture 7)
- Separate tab with information on data set (Interactive EDA of training data etc.)
- Separate tab with information on models, references, link to GitHub etc.

## Rough code notes

### Data

- Custom PyTorch `DataSet` for the data set that is used?  Not sure if we need this if we used a data set that is organized into forlders, then we can just use `torchvision.datasets.ImageFolder`.
- Also need to add data transformations (e.g. flip, noise, cropping)
- PyTorch `DataLoader` to load the data set for training

### Neural Nets

- Need one class per NN (inherit from `nn.Module`), however we can probably share some functions like training loop etc. rather than defining explicitly in each class
- Maybe also have a general function that prints out the status after each epoch nicely?
- When predicting make sure to use `with torch.no_grad()`
- Things to tune for all NN: epoch, batch size, lr
- Additional things for custom: architecture
- Need to pick an appropriate loss function
- Need to set an optimizer
- Will need to save our final models
- Looks like it's cleaner to abstract out train/validation steps of training loop to separate functions

### Misc

- Ensure to have `device = "cuda" if torch.cuda.is_available() else "cpu"`

## Ideas for Neural Nets

### Custom Neural Net

- Could try to create a NN from scratch to serve as a "base" model

### Transfer Learning

- These could be good networks to use and provide a good breadth of different architectures over time:
  - [AlexNet (2014)](https://arxiv.org/abs/1404.5997)
  - [ResNet (2015)](https://arxiv.org/abs/1512.03385)
  - [DenseNet (2018)](https://arxiv.org/abs/1608.06993)
  - [ConvNeXt (2022)](https://arxiv.org/abs/2201.03545)
- For ResNet and DenseNet will need to choose a specific NN e.g. ResNet-18 vs. ResNet-152 (will need to figure out how larger networks affect compute/memory on dashboard, probably just easier to start small)
- ConvNeXt is especially exciting since it includes transformers and is very recent
- PyTorch has all of them available in [`torchvision.models`](https://pytorch.org/vision/stable/models.html) including w/ pre-trained weights for transfer learning

## Useful PyTorch Links

- [Tutorials](https://pytorch.org/tutorials/index.html)
- [Datasets included](https://pytorch.org/vision/stable/datasets.html)
- [Models and Pre-trained Weights](https://pytorch.org/vision/stable/models.html)

## Other links

- [1st Place Solution for Intel Scene Classification Challenge](https://medium.com/@afzalsayed96/1st-place-solution-for-intel-scene-classification-challenge-c95cf941f8ed)
- [Indoor Scene Recognition - Pytorch](https://www.kaggle.com/kshitijmohan/indoor-scene-recognition-pytorch)
