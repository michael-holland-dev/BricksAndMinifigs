import ImageCarosel from "./imageCarosel";
import LegoSetProperty from "./legoSetProperty";
import { useContext } from "react";
import ImageModalContext from "../../../components/context/ImageModalContext";
import ImageModal from "./imageModal";

/**
 * `ProductContainer` is a functional React component that displays detailed information about a LEGO set.
 * 
 * The component uses `ImageCarosel` to display a carousel of images and `LegoSetProperty` to show various properties of the LEGO set.
 *
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.name - The name of the LEGO set.
 * @param {string[]} props.images - An array of image URLs for the LEGO set.
 * @param {number} props.num_minifigs - The number of minifigures included in the set.
 * @param {number} props.pieces - The total number of pieces in the set.
 * @param {number} props.release_year - The release year of the LEGO set.
 * @param {boolean} props.retired - A boolean indicating whether the set is retired.
 * @param {string} props.set_number - The set number of the LEGO set.
 * 
 * @returns {JSX.Element} A `div` element styled as a container that includes the LEGO set name, image carousel, and set properties.
 */
function ProductContainer(props) {
    // Use the image modal context to determine whether or not the image modal should be displayed.
    const { displayImage, setDisplayImage } = useContext(ImageModalContext)

    return (
        <>
            <div
                className="p-7 flex flex-col bg-white items-center rounded-lg gap-10 m-16 drop-shadow-lg"
            >
                <div
                    className="font-bold text-3xl text-primary"
                >
                    {props.name}
                </div>
                <div
                    className="flex flex-row gap-10"
                >
                    <ImageCarosel images={props.images} />
                    <div
                        className="flex flex-col"
                    >
                        <LegoSetProperty label="Number of Minifigures" value={props.num_minifigs}/>
                        <LegoSetProperty label="Pieces" value={props.pieces}/>
                        <LegoSetProperty label="Release Year" value={props.release_year}/>
                        <LegoSetProperty label="Retired" value={props.retired ? "Yes" : "No" }/>
                        <LegoSetProperty label="Set Number" value={props.set_number}/>
                    </div>
                </div>
            </div>
            {displayImage ?  <ImageModal /> : <> </>}
        </>
    )
}

export default ProductContainer;
