import { getLegoSet } from "../../handlers/getLegoSet";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { LoadingDetails, ProductContainer } from "./components";
import ImageModalContextComponent from "../../components/context/ImageModalContextComponent";


/**
 * `LegoDetails` is a functional React component that fetches and displays details for a LEGO set based on the provided `id` parameter.
 *
 * The component uses `useParams` to retrieve the `id` from the URL, and `useState` to manage the state of the LEGO set data. It fetches the LEGO set data using the `getLegoSet` function and displays either the `ProductContainer` component with the LEGO set details or the `LoadingDetails` component while the data is being fetched.
 *
 * @component
 * @returns {JSX.Element} A `div` element styled to center its content vertically and horizontally. It conditionally renders `ProductContainer` if the LEGO set data is available, otherwise it renders `LoadingDetails`.
 *
 */
function LegoDetails() {
    const { id } = useParams();
    const [legoSet, setLegoSet] = useState(null);

    // Fetch LEGO set details if not already fetched
    if (!legoSet) {
        getLegoSet(id).then((results) => setLegoSet(results));
    }
    console.log(legoSet);

    return (
        <>
            <ImageModalContextComponent>
                <div
                    className="h-full flex flex-col justify-center items-center"
                >
                    {legoSet ? <ProductContainer {...legoSet} /> : <LoadingDetails />}
                </div>
            </ ImageModalContextComponent>
        </>
    );
}

export default LegoDetails;
