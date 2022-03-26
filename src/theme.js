import { createTheme } from '@mui/material/styles';

export const baseTheme = createTheme({
    typography: {
        fontFamily: ['"Montserrat"', 'Open Sans'].join(',')
    }
})

export const darkThemeMui = createTheme({
    ...baseTheme,
    palette: {
        type: "dark",
        primary: {
            main: "#26a27b"
        },
        secondary: {
            main: "#fafafa"
        },
    }
})

export const lightThemeMui = createTheme({
    ...baseTheme,
    palette: {
        type: "light",
        primary: {
            main: "#fafafa"
        },
        secondary: {
            main: "#26a27b"
        }
    }
})


export const lightTheme = {
    body: '#FFF',
    text: '#363537',
    toggleBorder: '#FFF',
    background: '#363537',
}


export const darkTheme = {
    body: '#363537',
    text: '#FAFAFA',
    toggleBorder: '#6B8096',
    background: '#999',
}