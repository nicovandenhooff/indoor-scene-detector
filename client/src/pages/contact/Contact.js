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
                maxWidth: '1000px'
            }}>
                <Typography
                    variant="h5"
                    component="p"
                    sx={{ mb: 1 }}
                >
                    Contact
                </Typography>
                <Typography
                    variant="body"
                    component="p"
                    sx={{ mb: 2 }}
                >
                    Select or upload an image of an indoor scene to classify it!
                </Typography>
                <Typography
                    variant="body"
                    component="p"
                    sx={{ mb: 2 }}
                >
                    Select or upload an image of an indoor scene to classify it!
                </Typography>
            </Box>
        </Container>
    )


}
