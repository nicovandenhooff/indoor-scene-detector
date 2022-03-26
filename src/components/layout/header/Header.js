import React from 'react'
import { ThemeContext } from '../../../context'

import './Header.css'

export const Header = ({ children }) => {

    return (
        <ThemeContext.Consumer>
            {({ isDarkTheme, toggleTheme }) => (
                < div className={isDarkTheme ? "header header-dark" : "header"} >
                    {children}
                    {isDarkTheme ?
                        <button
                            type="button"
                            className="theme-button"
                            onClick={toggleTheme}
                        >
                            <img
                                src="https://assets.ccbp.in/frontend/react-js/dark-theme-img.png"
                                className="theme-img"
                                alt="theme"
                            />
                        </button> :
                        <button
                            type="button"
                            className="theme-button"
                            onClick={toggleTheme}
                        >
                            <img
                                src="https://assets.ccbp.in/frontend/react-js/light-theme-img.png"
                                className="theme-img"
                                alt="theme"
                            />
                        </button>}

                </div >
            )
            }
        </ThemeContext.Consumer >
    )

}