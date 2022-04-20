import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu'
import {
    AppBar, Box, Toolbar, IconButton,
    Typography, Menu, MenuItem,
    Container, Button
} from '@mui/material';
import { Link } from "react-router-dom";
// import { ThemeToggle } from "../../themeToggle/ThemeToggle";

const pages = {
    'Dashboard': '',
    'About': 'about',
    'Contact': 'contact'
}


export const NavBar = () => {
    const [anchorElNav, setAnchorElNav] = useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget)
    }

    const handleCloseNavMenu = () => {
        setAnchorElNav(null)
    }

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h5"
                        component="div"
                        sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                    >
                        Indoor Scene Detector
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {Object.keys(pages).map((key) => (
                                <MenuItem key={key} onClick={handleCloseNavMenu}>
                                    <Link style={{ textDecoration: 'none', color: 'white' }} to={'/' + pages[key]} >
                                        <Typography textAlign="center" >{key}</Typography>
                                    </Link>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                    >
                        Indoor Scene Detector
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', justifyContent: 'flex-end' } }}>
                        {Object.keys(pages).map((key) => (
                            <Button
                                key={key}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                <Link style={{ textDecoration: 'none', color: 'white' }} to={'/' + pages[key]} >
                                    <Typography textAlign="center" >{key}</Typography>
                                </Link>
                            </Button>
                        ))}
                    </Box>
                    {/* <ThemeToggle /> */}
                </Toolbar>

            </Container>
        </AppBar>
    );
};
