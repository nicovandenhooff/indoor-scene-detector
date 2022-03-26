import React from 'react'

import './Panel.css'

export const Panel = ({ children }) => {

    return (
        <div className="panel">
            {children}
        </div>
    )

}