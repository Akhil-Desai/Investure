import axios from "axios"

const API_BASE_URL = "http://localhost:5001"

export const uploadFile = async(file: any) => {
    const formData = new FormData()
    formData.append("file", file)

    try {
        const response = await axios.post(`${API_BASE_URL}/upload`, formData)
        return response.data
    } catch (error) {
        console.log("error uploading file", error)
        throw error;
    }
}
