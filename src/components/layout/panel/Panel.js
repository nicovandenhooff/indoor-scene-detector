import React, { useContext } from 'react'
import { ThemeContext } from "../../../context"


import './Panel.css'

export const Panel = ({ children, className }) => {

    const { theme } = useContext(ThemeContext)

    return (

        < div className={theme === 'light' ? `panel ${className}` : `panel panel-dark ${className}`} >
            {children}
        </div>
    )

}