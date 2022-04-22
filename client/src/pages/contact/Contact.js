import React from 'react'
import { Container, Box, Typography } from '@mui/material';


export const Contact = () => {

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
                    Creators
                </Typography>
                <Typography
                    variant="body"
                    component="p"
                    sx={{ mb: 2 }}
                >
                    Indoor Scene Detector was created and is maintained by <a href="https://www.linkedin.com/in/nicovandenhooff/">Nico Van den Hooff</a> and <a href="https://www.linkedin.com/in/mel-liow/">Melissa Liow</a>.
                </Typography>
                <Typography
                    variant="body"
                    component="p"
                    sx={{ mb: 2 }}
                >
                    Nico maintains the backend, MLOps, and DevOps components of the application.  Melissa maintains the frontend component of the application.
                </Typography>
            </Box>
        </Container >
    )


}
