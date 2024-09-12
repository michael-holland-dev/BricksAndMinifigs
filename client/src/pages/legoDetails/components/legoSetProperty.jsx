/**
 * LegoSetProperty component
 * 
 * Renders a label and its associated value if the value is neither `null` nor of type `null`.
 * 
 * @param {Object} props - The properties object
 * @param {string} props.label - The label to display
 * @param {*} props.value - The value to display
 * @returns {JSX.Element} A JSX element that displays the label and value, or an empty fragment if the value is `null`.
 */
function LegoSetProperty(props) {
    // Check if the value is not "null" and the type of value is not `null`
    return String(props.value) !== "null" && typeof(props.value) != null ? (
        // Render the label and value inside a flex container
        <div
            className="flex flex-row"
        >
            <div
                className="font-bold pr-2 text-primary"
            >
                {props.label}:
            </div>
            <div>
                {String(props.value)}
            </div>
        </div>
    ) : (
        // Return an empty fragment if the condition is not met
        <></>
    );
}

export default LegoSetProperty;
