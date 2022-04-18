import React from 'react'
import { Body } from "../../components/layout";
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
                    variant="h6"
                    component="p"
                    sx={{ mb: 1 }}
                >
                    Welcome to the Indoor Scene Image Detector.
                </Typography>
                <Typography
                    variant="body"
                    component="p"
                    sx={{ mb: 2 }}
                >
                    Select or upload an image of an indoor scene to classify it!
                </Typography>
            </Box>
            <Body>
                hello
            </Body>
        </Container>
    )


}
