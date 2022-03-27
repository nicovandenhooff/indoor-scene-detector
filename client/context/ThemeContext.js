import React, { createContext } from 'react'

import { ThemeProvider as GlobalThemeProvider } from 'styled-components';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { lightThemeMui, darkThemeMui, lightTheme, darkTheme } from '../theme';
import { useDarkMode } from '../hooks';


const ThemeContext = createContext('light');

const ThemeProvider = ({ children }) => {

    const [theme, toggleTheme, componentMounted] = useDarkMode()

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, componentMounted }}>
            <GlobalThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
                <MuiThemeProvider theme={theme === 'light' ? lightThemeMui : darkThemeMui}>
                    {children}
                </MuiThemeProvider>
            </GlobalThemeProvider>
        </ThemeContext.Provider >
    )
}

export { ThemeContext, ThemeProvider };