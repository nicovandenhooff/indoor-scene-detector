# Indoor Scene Detector

[![ci-cd](https://github.com/nicovandenhooff/indoor-scene-detector/workflows/ci-cd/badge.svg)](https://github.com/nicovandenhooff/indoor-scene-detector/actions/workflows/ci-cd.yml) [![ci-main](https://github.com/nicovandenhooff/indoor-scene-detector/workflows/ci-main/badge.svg)](https://github.com/nicovandenhooff/indoor-scene-detector/actions/workflows/ci-main.yml) [![GitHub deployments](https://img.shields.io/github/deployments/nicovandenhooff/indoor-scene-detector/github-pages?label=gh-pages)](https://github.com/nicovandenhooff/indoor-scene-detector/deployments/activity_log?environment=github-pages) [![Website](https://img.shields.io/website?down_color=red&url=http%3A%2F%2Fwww.indoorscenedetector.com)](https://www.indoorscenedetector.com/) [![License](https://img.shields.io/github/license/nicovandenhooff/indoor-scene-detector)](https://github.com/nicovandenhooff/indoor-scene-detector/blob/main/LICENSE) [![GitHub release (latest by date)](https://img.shields.io/github/v/release/nicovandenhooff/indoor-scene-detector)](https://github.com/nicovandenhooff/indoor-scene-detector/releases/)

This repository contains the source code for the Indoor Scene Detector application.  Indoor Scene Detector is a full stack computer vision application built with PyTorch, Captum, Flask, React, Docker, Heroku and GitHub Pages.  You can access the application at www.indoorscenedetector.com.

## About

### Creators

Indoor Scene Detector was created and is maintained by [Nico Van den Hooff](https://github.com/nicovandenhooff) and [Melissa Liow](https://github.com/mel-liow).

Nico maintains the backend, MLOps, and DevOps components of the application.  Melissa maintains the frontend component of the application.

### Description

Indoor Scene Detector is capable of classifying images of an indoor scene, such as a bedroom or a kitchen.  Currently, Indoor Scene Detector includes support for ten categories of scenes: airport, bakery, bar, bedroom, kitchen, living room, pantry, restaurant, subway, and warehouse.  Support for more classes is currently under development.

In order to classify a scene, there are four convolutional neural networks available.  These include tuned versions of AlexNet, ResNet, or DenseNet, in addition to a simple "vanilla" CNN that has no transfer learning applied to it.  If AlexNet, ResNet or DenseNet are used, Indoor Scene Detector demonstrates the power of transfer learning in computer vision, as the tuned versions of these networks should obtain a much higher accuracy in predictions when compared to the simple CNN with no transfer learning.

### Model Training

The data set used in training the CNNs that power Indoor Scene Detector is the [Indoor Scene Recognition](https://web.mit.edu/torralba/www/indoor.html) data set collected by MIT.  Right now, the beta version of Indoor Scene Detector is trained on a subset of this data set, which includes 10 out of 67 total classes.  The 10 classes used are those with the most pictures for their respective classes in the entire dataset itself.  Within these classes there are a total of 5,661 images (approximately 500 images per class).  Each model has been trained for of 25 epochs, unless early stopping with a patience of 5 epochs occured.

### Model Outputs

Each CNN will output the top three predictions for an image ranked by probability in descending order.  In addition, a heatmap of the images Saliency attributes is plotted.  Saliency is an algorithm that attempts to explain the predictions a CNN makes by calculating the gradient of the output with respect to the input.  The absolute value of Saliency attributes can be taken to represent feature importance.  To learn more, please see the [original paper](https://arxiv.org/pdf/1312.6034.pdf), or the [Captum documentation](https://captum.ai/docs/algorithms#saliency).

## How to Use Indoor Scene Detector

1. Open the application at: www.indoorscenedetector.com
2. Select one of the preloaded images or upload your own to classify.
3. Select the convolutional neural network you would like to use to classify the image.
4. Press submit and your image will be classified.

## Development

### Contributing

To learn more about making a contribution to Indoor Scene Detector, please see the [contributing file](https://github.com/nicovandenhooff/indoor-scene-detector/blob/main/CONTRIBUTING.md).

### Installation and running locally

#### Users **without** an M1 chip Mac

1. Install [Docker](https://docs.docker.com/get-docker/) for your operating system.

2. Open up a terminal and run the following commands:

    a. Clone our repository

    ```bash
    git clone https://github.com/nicovandenhooff/indoor-scene-detector.git
    ```

    b. Change working directories

    ```bash
    cd indoor-scene-detector
    ```

    c. Run the application

    ```bash
    docker-compose up
    ```

3. In a web browser, navigate to <http://localhost:3000/> to view the application.

4. Once you are finished with the application, run the following command the same terminal:

    d. To shut down the Docker images, containers etc.

    ```bash
    docker-compose down
    ```

#### Users **with** an M1 chip Mac

These steps will require two terminals, referred to as terminal A and terminal B.

1. Ensure you have [npm](https://nodejs.org/en/), [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable), and [Python](https://www.python.org/downloads/) installed.

2. Open up terminal A and run the following commands to start the frontend:

    ```bash
    git clone https://github.com/nicovandenhooff/indoor-scene-detector.git
    cd indoor-scene-detector/client
    yarn install
    yarn start
    ```

3. Open up terminal B and run the following commands to start the backend:

    ```bash
    cd indoor-scene-detector/api
    python3 -m venv venv
    source venv/bin/activate
    pip install -r requirements.txt
    cd ../client
    yarn start-api
    ```

4. If it hasn't opened already, navigate to <http://localhost:3000/> in a web browser to view the application.

## Attributions

The data set used in building Indoor Scene Detector was the [Indoor Scene Recognition](https://web.mit.edu/torralba/www/indoor.html) data set collected by MIT.
