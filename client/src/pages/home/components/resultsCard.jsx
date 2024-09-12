/**
 * ResultsCard component - Displays a search result with an image and name
 * 
 * @param {Object} props - Component props
 * @param {string} props.displayImage - URL of the image to display (optional)
 * @param {string} props.id - ID used for the URL in the link
 * @param {string} props.name - Name displayed on the card
 * 
 * @returns {JSX.Element} The ResultsCard component
 */
function ResultsCard(props) {
    // Default image URL if no image URL is provided
    var displayImage = null;

    // Log the props to the console for debugging
    console.log(props);

    // Determine the image to display
    if (props.displayImage) {
        displayImage = props.displayImage;
    } else {
        displayImage = "/brick.jpg";
    }

    return (
        <>
            <a
                href={`/legoset/${props.id}`}
                className="flex flex-col items-center max-w-36 bg-white rounded p-5 ease-in-out duration-300 hover:drop-shadow-lg hover:cursor-pointer"
            >
                <img
                    className="w-24 h-24"
                    src={displayImage}
                    alt={`Image of ${props.name}`}
                />
                <div
                    className="text-center pt-5 text-primary font-bold line-clamp-3"
                >
                    {props.name}
                </div>
            </a>
        </>
    );
}

export default ResultsCard;
