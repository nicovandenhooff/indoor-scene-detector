import React from 'react'
import { List, ListItem, ListItemText, Container, Box, Typography } from '@mui/material';


export const About = () => {

    return (
        <Container
            maxWidth="xl"
            sx={{
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
            }}>
            <Box sx={{
                padding: '40px 40px 20px',
            }}>
                <Typography
                    variant="h4"
                    component="p"
                    sx={{ mb: 1 }}
                >
                    Application Description
                </Typography>
                <Typography
                    variant="body"
                    component="p"
                    sx={{ mb: 2 }}
                >
                    Indoor Scene Detector is a full stack computer vision application built with PyTorch, Captum, Flask, React, Docker, Heroku and GitHub Pages.
                </Typography>
                <Typography
                    variant="body"
                    component="p"
                    sx={{ mb: 2 }}
                >
                    Indoor Scene Detector is capable of classifying images of an indoor scene, such as a bedroom or a kitchen.  Currently, Indoor Scene Detector includes support for ten categories of scenes: airport, bakery, bar, bedroom, kitchen, living room, pantry, restaurant, subway, and warehouse.  Support for more classes is currently under development.
                </Typography>
                <Typography
                    variant="body"
                    component="p"
                    sx={{ mb: 2 }}
                >
                    In order to classify a scene, there are four convolutional neural networks available.  These include tuned versions of AlexNet, ResNet, or DenseNet, in addition to a simple "vanilla" CNN that has no transfer learning applied to it.  If AlexNet, ResNet or DenseNet are used, Indoor Scene Detector demonstrates the power of transfer learning in computer vision, as the tuned versions of these networks should obtain a much higher accuracy in predictions when compared to the simple CNN with no transfer learning.
                </Typography>
                <Typography
                    variant="h4"
                    component="p"
                    sx={{ mb: 1 }}
                >
                    How to Use Indoor Scene Detector
                </Typography>
                <Typography
                    variant="body"
                    component="p"
                    sx={{ mb: 2 }}
                >
                    <List>
                        <ListItem disablePadding>
                            <ListItemText primary="1. Select one of the preloaded images or upload your own to classify." />
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemText primary="2. Select the convolutional neural network you would like to use to classify the image." />
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemText primary="3. Press submit and your image will be classified." />
                        </ListItem>
                    </List>
                </Typography>
                <Typography
                    variant="h4"
                    component="p"
                    sx={{ mb: 1 }}
                >
                    Model Outputs
                </Typography>
                <Typography
                    variant="body"
                    component="p"
                    sx={{ mb: 2 }}
                >
                    Each CNN will output the top three predictions for an image ranked by probability in descending order.  In addition, a heatmap of the images Saliency attributes is plotted.  Saliency is an algorithm that attempts to explain the predictions a CNN makes by calculating the gradient of the output with respect to the input.  The absolute value of Saliency attributes can be taken to represent feature importance.
                    To learn more, please see the <a href="https://arxiv.org/pdf/1312.6034.pdf">original paper</a>, or the <a href="https://captum.ai/docs/algorithms#saliency">Captum</a> documentation.
                </Typography>
                <Typography
                    variant="h4"
                    component="p"
                    sx={{ mb: 1 }}
                >
                    Source Code
                </Typography>
                <Typography
                    variant="body"
                    component="p"
                    sx={{ mb: 2 }}
                >
                    The source code for Indoor Scene Detector is hosted in this <a href="https://github.com/nicovandenhooff/cnn-dashboard">GitHub repository</a>.
                </Typography>
                <Typography
                    variant="h4"
                    component="p"
                    sx={{ mb: 1 }}
                >
                    Attributions
                </Typography>
                <Typography
                    variant="body"
                    component="p"
                    sx={{ mb: 2 }}
                >
                    The data set used in building Indoor Scene Detector was the <a href="https://web.mit.edu/torralba/www/indoor.html">Indoor Scene Recognition</a> data set collected by MIT.
                </Typography>
            </Box>
        </Container >
    )


}
