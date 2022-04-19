# Indoor Scene Detector

This repository contains the source code as it relates to the Indoor Scene Detector application.

*TODO: Change repo name and update README as required*
*TODO: Add metadata shields from <https://shields.io/>*

## About

Indoor Scene Detector ("ISD") is a full stack deep learning application built by [Nico Van den Hooff](https://github.com/nicovandenhooff) and [Melissa Liow](https://github.com/nicovandenhooff).  ISD can be used to classify images of an indoor scene, for example a bedroom or a kitchen.  ISD was built with the goal of empirically demonstrating the power of transfer learning when applied to convolutional neural networks ("CNN").  Specifically, a user of the application can show how tuned versions of AlexNet, DenseNet or ResNet are far superior to a CNN with no transfer learning.  Further, ISD also demonstrates how different types of transfer learning lead to differing levels of accuracy at prediction time.  Specifically, if transfer learning is applied by tuning all the layers of a pre-trained CNN, then predictions are higher compared to if only the last layer of a pre-trained CNN are tuned (and the remaining layers remain frozen).

## How to Use Indoor Scene Detector

1. Open the application at: <link-to-go-here>
2. Select one of the available images or upload your own.
3. Select the convolutional neural network you would like to use to classify the image.
4. If you selected AlexNet, DenseNet, or ResNet, select a level of transfer learning.
5. Press submit and your image will be classified.

*TODO: Add GIF*
*TODO: Add heatmap instructions*

## Development

### Contributing

*TODO: Add contributing link*
To learn more about making a contribution to Indoor Scene Detector, please see the contributing file.

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
