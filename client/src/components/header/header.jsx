/**
 * Header Component
 *
 * This component renders the header for the application. It displays a logo,
 * the application's name, and a search input if the user is on the home page.
 * The search input triggers the backend search functionality.
 *
 * @returns {JSX.Element} A header with the application's logo, name, and a search bar (on the home page).
 */
import { useContext } from "react";
import SearchContext from "../context/SearchContext";
import { getSearchResults } from "../../handlers/getSearchResults";

function Header() {
    // Get search results and setter function from the SearchContext
    const { searchResults, setSearchResults } = useContext(SearchContext);

    // Determine if the current page is the home page.
    const currentPage = window.location.href.replace(/\/$/, "").split("/").pop();
    var renderSearch = false;
    if (currentPage === window.location.host) {
        renderSearch = true;
    }


    // Triggered whenever the user types into the search input field.
    // It sends the search query to the backend and updates the search results.
    const enterSearchQuery = (event) => {
        const searchQuery = event.target.value;

        // Retrieve search results and update the context state
        if (searchQuery.length >= 3) {
            getSearchResults(searchQuery).then((newlyRetrieved) => {
                setSearchResults(newlyRetrieved);
            });
        }
        else {
            setSearchResults(null)
        }
    };

    return (
        <>
            <div className="p-3 pl-10 py-4 bg-primary flex flex-row justify-between items-center gap-10">
                {/* Logo and application name */}
                <a className="flex flex-row items-center gap-3 pl" href="/">
                    <img src="/logo.png" alt="Bricks and Minifigs" className="w-20" />
                    <div className="font-bold text-white text-2xl">-</div>
                    <div className="font-bold text-white text-2xl whitespace-nowrap">
                        Catalogue Search Tool
                    </div>
                </a>

                <div className="absolute left-1/2 transform -translate-x-1/2">
                    {renderSearch ? (
                        <input
                            className="rounded-lg h-10 w-96 font-sans text-sm p-2 text-center"
                            type="text"
                            placeholder="Enter Query Here!"
                            onChange={enterSearchQuery}
                        />
                    ) : (
                        <></>
                    )}
                </div>
            </div>
        </>
    );
}

export default Header;
