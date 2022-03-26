import React, { useContext } from 'react'
import { ThemeContext } from "../../../context"

import './Header.css'

export const Header = ({ children }) => {
    const { theme, toggleTheme } = useContext(ThemeContext)

    return (

        < div className={theme === 'light' ? "header" : "header header-dark"} >
            {children}
            {theme === 'light' ?
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