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

## Transfer learning nets

- [PyTorch - Models and Pre-trained Weights](https://pytorch.org/vision/stable/models.html)

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

## Other links

- [PyTorch Tutorials](https://pytorch.org/tutorials/index.html)
- [1st Place Solution for Intel Scene Classification Challenge](https://medium.com/@afzalsayed96/1st-place-solution-for-intel-scene-classification-challenge-c95cf941f8ed)
- [Indoor Scene Recognition - Pytorch](https://www.kaggle.com/kshitijmohan/indoor-scene-recognition-pytorch)
