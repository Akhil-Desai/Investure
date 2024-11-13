//imports
import axios from "axios"

//Server URL
const API_BASE_URL = "http://localhost:5001"


/**
 * Uploads a file to the server using an HTTP POST request.
 *
 * @async
 * @function uploadFile
 * @param {File} file - The file to be uploaded.
 * @returns {Promise<Object>} - Resolves with the server's response data on successful upload.
 * @throws {Error} - Throws an error if the file upload fails.
 */
export const uploadFile = async(file: any) => {
    const formData = new FormData()
    formData.append("file", file)

    try {
        const response = await axios.post(`${API_BASE_URL}/upload`, formData)
        return response.data.message
    } catch (error) {
        console.log("error uploading file", error)
        throw error;
    }
}

/**
 * Retrieves the data from the server using an HTTP GET request
 *
 * @async
 * @function fetchTotalReturns
 * @returns {Array<Object>} - Resolves with the fetched data from the server
 * @throws {error}
 */
export const fetchTotalReturns = async() => {
    try {
        const fetchedData = await axios.get(`${API_BASE_URL}/getTotalReturns`)
        return fetchedData
    } catch (error) {
        console.log("error fetching data", error)
        throw error
    }
}
