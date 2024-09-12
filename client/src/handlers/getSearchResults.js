import axios from 'axios'

/**
 * Fetches LEGO set search results from a local server based on the search string and pagination options.
 *
 * @param {string} searchString - The query to search for.
 * @param {number} [pageNum=0] - The page number for pagination (default is 0).
 * @param {number} [limit=20] - The maximum number of results to fetch per page (default is 20).
 * 
 * @returns {Promise<Object|null>} - A promise that resolves to an object containing:
 *   - {number} currentPage: The current page of search results.
 *   - {number} numPages: The total number of pages.
 *   - {Array} legoSets: The search results (LEGO sets).
 *   - {string} searchString: The original search query.
 *   If the request fails or returns an unsuccessful response, it returns `null`.
 * 
 * @throws {Error} - Throws an error if the request fails.
 */
async function getSearchResults(searchString, pageNum=0, limit=20) {
    const params = {
        "query": searchString,
        "page": pageNum,
        "limit": limit
    }

    try {
        const searchResults = await axios.get("http://localhost:8000/search", { params });
        if (searchResults.data.success === true) {
            const results = {
                currentPage: searchResults.data.results.current_page,
                numPages: searchResults.data.results.num_pages,
                legoSets: searchResults.data.results.search_results,
                searchString: searchString
            };
            console.log(searchResults);
            return results;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error fetching LEGO sets:", error);
        throw error;
    }
}

export { getSearchResults };
