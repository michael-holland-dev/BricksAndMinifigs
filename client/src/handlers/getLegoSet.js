import axios from 'axios';

/**
 * Fetches a LEGO set from the server based on the provided ID.
 * 
 * This function sends a GET request to a server at `http://localhost:8000/legoset/{id}` 
 * to retrieve details of a LEGO set with the given ID. If the server responds with a 
 * success status, it returns the LEGO set data. If the response indicates failure or 
 * there is an error, the function will return `null` or throw an error.
 * 
 * @param {number} id - The ID of the LEGO set to retrieve.
 * @returns {Object|null} The LEGO set object if the request is successful, or `null` if not.
 * @throws Will throw an error if the request fails.
 */
async function getLegoSet(id) {
    try {
        // Sends a GET request to the server to retrieve the LEGO set by ID.
        const legoSetResponse = await axios.get(`http://localhost:8000/legoset/${id}`);
        
        // Checks if the response indicates success and returns the LEGO set data.
        if (legoSetResponse.data.success === true) {
            return legoSetResponse.data.results.legoset;
        } else {
            return null;  // Returns null if the response is not successful.
        }
    } catch (error) {
        // Logs an error message and rethrows the error if the request fails.
        console.error(`Error fetching LEGO set: ${id}`, error);
        throw error;
    }
}

export { getLegoSet };
