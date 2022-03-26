import React from 'react'
import { ThemeContext } from '../../../context'


import './Panel.css'

export const Panel = ({ children, className }) => {
    return (
        <ThemeContext.Consumer>
            {({ isDarkTheme, toggleTheme }) => (
                < div className={isDarkTheme ? `panel panel-dark ${className}` : `panel ${className}`} >
                    {children}
                </div>
            )
            }
        </ThemeContext.Consumer >
    )

}