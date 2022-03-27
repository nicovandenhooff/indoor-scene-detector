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
            main: "#8499B1"
        },
        secondary: {
            main: "#053C5E"
        }
    }
})


export const lightTheme = {
    body: '#FFF',
    text: 'black',
    backgroundColor: '#26a27b',
}


export const darkTheme = {
    body: '#363537',
    text: '#FAFAFA',
    background: '#999',
}