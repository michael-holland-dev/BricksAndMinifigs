import SearchContext from "../../../components/context/SearchContext";
import { getSearchResults } from "../../../handlers/getSearchResults";
import { useContext } from "react";

/**
 * PageBanner Component
 * 
 * Displays a pagination banner allowing users to navigate through search result pages.
 * It fetches search results based on the selected page and updates the context with the new results.
 * 
 * @returns {JSX.Element} The rendered PageBanner component.
 */
function PageBanner() {
    // Retrieve search results and setter function from context
    const { searchResults, setSearchResults } = useContext(SearchContext);
    
    // Extract relevant data from search results
    const currentPage = searchResults.currentPage;
    const numPages = searchResults.numPages;
    const searchQuery = searchResults.searchString;
    console.log(searchQuery); // Logs the current search query to the console

    // Handles page clicks to fetch new search results.
    const clickPage = (key) => {
        // Fetch new search results based on the selected page
        getSearchResults(searchQuery, key).then((results) => {
            // Update search results in context
            setSearchResults(results);
        });
    }

    // Generate page elements for pagination
    let pages = [];
    for (let i = 0; i < numPages; ++i) {
        if (i === currentPage) {
            pages.push(
                <div key={i} className="text-blue-950 p-3">
                    {i}
                </div>
            );
        } else {
            pages.push(
                <div
                    key={i}
                    onClick={() => clickPage(i)}
                    className="hover:text-blue-700 hover:cursor-pointer p-3"
                >
                    {i}
                </div>
            );
        }
    }
    
    return (
        <div className="flex flex-row justify-center gap-5 text-primary">
            {pages}
        </div>
    );
}

export default PageBanner;
