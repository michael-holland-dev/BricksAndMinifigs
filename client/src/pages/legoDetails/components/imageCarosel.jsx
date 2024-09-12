import { useState, useContext } from "react";
import ImageModalContext from "../../../components/context/ImageModalContext";

/**
 * ImageCarosel component displays a carousel of images with navigation buttons.
 * 
 * Props:
 * - images (Array<string>): An array of image URLs to display in the carousel. If not provided, a default image ("/brick.jpg") will be used.
 * 
 * State:
 * - currentIndex (number): The index of the currently displayed image.
 * 
 * Functions:
 * - prevSlide: Updates the currentIndex to show the previous image in the carousel. Wraps around to the last image if at the beginning.
 * - nextSlide: Updates the currentIndex to show the next image in the carousel. Wraps around to the first image if at the end.
 * 
 * Render:
 * - Displays the current image in the carousel.
 * - Shows "Prev" and "Next" buttons if there is more than one image.
 */
function ImageCarosel(props) {
  // Initialize the images array. If props.images is provided, use it; otherwise, use a default image.
    var images = [];
    if (props.images) {
        images = props.images;
    } else {
        images.push("/brick.jpg");
    }

    // State to keep track of the currently displayed image index.
    const [currentIndex, setCurrentIndex] = useState(0);
    const { displayImage, setDisplayImage } = useContext(ImageModalContext);

    // Function to show the previous image.
    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    // Function to show the next image.
    const nextSlide = () => {
        const isLastSlide = currentIndex === images.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    // Log the images array to the console (for debugging purposes).

    // Get the current image based on the currentIndex.
    const currentImage = images[currentIndex];
    // Determine if the navigation buttons should be displayed.
    const displayButtons = images.length > 1;

    return (
        <>  
            <div className="flex flex-col items-center">
                <div id="carousel" className="flex overflow-hidden">
                <div 
                    className="h-48 flex hover:cursor-pointer"
                    onClick={() => {setDisplayImage(currentImage)}}
                >                  
                    <div className="w-48 flex flex-row justify-center self-center">
                        <img
                            className="max-w-48 max-h-48"
                            src={currentImage}
                            alt="Nature"
                        />
                    </div>
                </div>
                </div>
                {
                displayButtons ? 
                    <div className="flex w-full flex-row justify-between gap-4 pt-5">
                        <button
                            id="prev"
                            onClick={prevSlide}
                            className="left-0 transform bg-primary font-bold text-white px-3 py-1 rounded text-sm ease-in-out duration-300 hover:scale-110"
                        >
                        Prev
                        </button>
                        <button
                            id="next"
                            onClick={nextSlide}
                            className="left-0 transform bg-primary font-bold text-white px-3 py-1 rounded text-sm ease-in-out duration-300 hover:scale-110"
                        >
                        Next
                        </button>
                    </div> : null
                }
            </div>
        </>
    );
}

export default ImageCarosel;
