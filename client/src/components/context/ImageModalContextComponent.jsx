import React, { useState } from 'react'
import ImageModalContext from './ImageModalContext'

/**
 * Image Modal Context Component, Used to wrap application to gain context
 * @param {children} children Children of Context
 * @returns Context Component
 */
function ImageModalContextComponent({children}) {
    // Get state of search results
    const [ displayImage, setDisplayImage ] = useState(null);

    // Return search context
    return (
        <>
            <ImageModalContext.Provider value={{displayImage, setDisplayImage}}>
                {children}
            </ImageModalContext.Provider>
        </>
    )
}

export default ImageModalContextComponent;