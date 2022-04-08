import React from 'react'
import Container from '@mui/material/Container';

export const Body = ({ children }) => {

    return (
        <Container
            maxWidth="xl"
            sx={{
                flexGrow: 1,
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
            }}>
            {children}
        </Container >
    )

}