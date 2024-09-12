import { useContext } from "react";
import { PageBanner, ResultsCard } from "./components";
import SearchContext from "../../components/context/SearchContext";

/**
 * Home component renders the main page of the application.
 * It utilizes the SearchContext to access search results and display them.
 *
 * - **useContext**: Hook to access the context value from SearchContext.
 * - **PageBanner**: A component that displays a banner at the top of the page.
 * - **ResultsCard**: A component that displays individual LEGO set results.
 *
 * The component conditionally renders content based on the presence and content of `searchResults`.
 * 
 * @returns {JSX.Element} The rendered Home component.
 */
function Home() {

    // Extract searchResults and setSearchResults from SearchContext
    const { searchResults, setSearchResults } = useContext(SearchContext);
    
    return (
        <>
            {
            searchResults ? (
                searchResults.legoSets.length > 0 ? 
                (<>
                    {
                        searchResults.numPages > 1 ?
                        (<PageBanner />) : (<></>)
                    }
                    
                    <div
                        className="flex flex-row justify-center"
                    >
                        <div className="flex flex-row justify-center flex-wrap max-w-screen-xl gap-5 p-5">
                            {
                                // Map through the legoSets array and render a ResultsCard for each item
                                searchResults.legoSets.map((result, index) => (
                                    <ResultsCard 
                                        key={index} 
                                        name={result.name} 
                                        id={result.id} 
                                        displayImage={result.display_image}
                                    />
                                ))
                            }
                        </div>
                    </div>
                </>) : 
                <div className="text-center pt-10 text-primary font-semibold">
                    No Legoset Found :(
                </div>
            ) : (
                <div className="text-center pt-10 text-primary font-semibold">
                    Please enter the legoset you are looking for :)
                </div>
            )
            }
        </>
    )
}

export default Home;
