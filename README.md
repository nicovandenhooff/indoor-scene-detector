# Indoor Scene Detector

[![cd](https://github.com/nicovandenhooff/cnn-dashboard/workflows/cd/badge.svg)](https://github.com/nicovandenhooff/cnn-dashboard/actions) [![GitHub deployments](https://img.shields.io/github/deployments/nicovandenhooff/cnn-dashboard/github-pages?label=gh-pages)](https://github.com/nicovandenhooff/cnn-dashboard/deployments/activity_log?environment=github-pages) [![Website](https://img.shields.io/website?down_color=red&url=http%3A%2F%2Fwww.indoorscenedetector.com)](https://www.indoorscenedetector.com/) [![License](https://img.shields.io/github/license/nicovandenhooff/cnn-dashboard)](https://github.com/nicovandenhooff/cnn-dashboard/blob/main/LICENSE)

This repository contains the source code Indoor Scene Detector application, a full stack computer vision application built with PyTorch, Captum, Flask, React, and Docker.  You can access the application at www.indoorscenedetector.com.  The backend of the application is deployed on Heroku.

## About

### Creators

Indoor Scene Detector was built and is maintained by [Nico Van den Hooff](https://github.com/nicovandenhooff) and [Melissa Liow](https://github.com/mel-liow).

### Description

Indoor Scene Detector can be used to classify images of an indoor scene, for example a bedroom or a kitchen.  Further, Indoor Scene Detector contains four different convolutional neural networks that can be used to classify an image.  Specifically, tuned versions of AlexNet, ResNet, and DenseNet are available for use, in addition to a custom "vanilla" CNN that has no transfer learning.  If AlexNet, ResNet or DenseNet are used, a user of the application can see the power of transfer learning in computer vision, as tuned versions of these networks obtain a much higher accuracy in predictions relative to the simple network with no transfer learning.

### Model Outputs

In classifying an image, a model will output the top three predictions by probability ranked in descending order.  In addition, a Saliency Heatmap is plotted.  Saliency is a simple algorithm that attempts to explain predictions that a CNN makes by calculating the gradient of the output with respect to the input.  The absolute value of Saliency coefficients can be taken to represent feature importance.  To learn more, please see the [original paper](https://arxiv.org/pdf/1312.6034.pdf), or the [Captum documentation](https://captum.ai/docs/algorithms#saliency).

Currently, Indoor Scene Detector can classify indoor scenes of ten classes (airport, bakery, bar, bedroom, kitchen, living room, pantry, restaurant, subway, and warehouse).  Support for more classes is currently under development.

## How to Use Indoor Scene Detector

1. Open the application at: www.indoorscenedetector.com
2. Select one of the preloaded images or upload your own to classify.
3. Select the convolutional neural network you would like to use to classify the image.
4. Press submit and your image will be classified.

## Development

### Contributing

To learn more about making a contribution to Indoor Scene Detector, please see the [contributing file](https://github.com/nicovandenhooff/cnn-dashboard/blob/main/CONTRIBUTING.md).

### Installation and running locally

1. Install [Docker](https://docs.docker.com/get-docker/) for your operating system.

2. Open up a terminal and run the following commands:

    a. Clone our repository

    ```shell
    git clone https://github.com/nicovandenhooff/cnn-dashboard.git
    ```

    b. Change working directories

    ```shell
    cd cnn-dashboard
    ```

    c. Run the application

    ```shell
    docker-compose up
    ```

3. In a web browser, navigate to <http://localhost:3000/> to view the application.

4. Once you are finished with the application, run the following command the same terminal:

    d. To shut down the Docker images, containers etc.

    ```shell
    docker-compose down
    ```

## Attributions

The data set used in building Indoor Scene Detector was the [Indoor Scene Recognition](https://web.mit.edu/torralba/www/indoor.html) data set collected by MIT.
