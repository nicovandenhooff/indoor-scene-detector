import React from 'react'
import { Container, Box, Typography } from '@mui/material';


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
                    variant="h5"
                    component="p"
                    sx={{ mb: 1 }}
                >
                    About
                </Typography>
                <Typography
                    variant="body"
                    component="p"
                    sx={{ mb: 2 }}
                >
                    Indoor Scene Detector was built and is maintained by Nico Van den Hooff and Melissa Liow.
                </Typography>
            </Box>
            <Box sx={{
                padding: '40px 40px 20px',
                maxWidth: '1000px'
            }}>
                <Typography
                    variant="body"
                    component="p"
                    sx={{ mb: 1 }}
                >
                    About
                </Typography>
                <Typography
                    variant="body"
                    component="p"
                    sx={{ mb: 2 }}
                >
                    Indoor Scene Detector can be used to classify images of an indoor scene, for example a bedroom or a kitchen. Further, Indoor Scene Detector contains four different convolutional neural networks that can be used to classify an image. Specifically, tuned versions of AlexNet, ResNet, and DenseNet are available for use, in addition to a custom "vanilla" CNN that has no transfer learning. If AlexNet, ResNet or DenseNet are used, a user of the application can see the power of transfer learning in computer vision, as tuned versions of these networks obtain a much higher accuracy in predictions relative to the simple network with no transfer learning.
                </Typography>
                <Typography
                    variant="body"
                    component="p"
                    sx={{ mb: 2 }}
                >
                    More text here
                </Typography>
            </Box>
        </Container >
    )


}
