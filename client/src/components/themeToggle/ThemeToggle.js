import React, { useContext } from 'react'
import { ThemeContext } from "../../context"
import Switch from '@mui/material/Switch';

export const ThemeToggle = () => {

    const { theme, toggleTheme } = useContext(ThemeContext)

    return (
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Switch onChange={toggleTheme} checked={theme === "light" ? false : true} />
        </div>
    )

}

