import { useContext } from "react";
import ImageModalContext from "../../../components/context/ImageModalContext";

/**
 * ImageModal Component
 *
 * This component displays a modal overlay with an image in the center of the screen.
 * It uses the `ImageModalContext` to manage the visibility and source of the image.
 *
 * Props:
 * - None
 *
 * Context:
 * - `displayImage`: The URL of the image to display.
 * - `setDisplayImage`: Function to set the URL of the image or hide the modal by setting it to `null`.
 *
 * Functionality:
 * - The modal is a fixed overlay with a semi-transparent black background.
 * - Clicking on the overlay will close the modal by setting `displayImage` to `null`.
 * - The image is displayed in a white, rounded container with no pointer events.
 *
 * @param {Object} props - The props object (currently unused).
 * @returns {JSX.Element} The rendered ImageModal component.
 */
function ImageModal(props) {
    // Destructure the context values
    const { displayImage, setDisplayImage } = useContext(ImageModalContext);

    return (
        <>
            <div
                className="fixed bg-black bg-opacity-80 text-white top-0 left-0 w-full h-full hover:cursor-pointer flex justify-center items-center"
                onClick={() => { setDisplayImage(null); }}
            >
                <div
                    className="p-10 bg-white rounded-xl opacity-100 pointer-events-none"
                >
                    <img
                        src={displayImage}
                        alt={displayImage}
                    />
                </div>
            </div>
        </>
    );
}

export default ImageModal;