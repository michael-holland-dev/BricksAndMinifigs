import React, { useState } from 'react'
import SearchContext from './SearchContext'

/**
 * Search Context Component, Used to wrap application to gain context
 * @param {children} children Children of Context
 * @returns Context Component
 */
function SearchContextComponent({children}) {
    // Get state of search results
    const [searchResults, setSearchResults] = useState(null);

    // Return search context
    return (
        <>
            <SearchContext.Provider value={{searchResults, setSearchResults}}>
                {children}
            </SearchContext.Provider>
        </>
    )
}

export default SearchContextComponent;