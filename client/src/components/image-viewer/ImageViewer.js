import React from 'react'

import './ImageViewer.css'

export const ImageViewer = ({ src }) => {

    return (
        <div>
            <img src={src} className="image" alt="upload" />
        </div>
    )

}