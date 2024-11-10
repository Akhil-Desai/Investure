import React, { useState } from 'react'
import { uploadFile } from '../services/api'


function FileUploadPage() {
    const [file, setFile] = useState(null)

    const handleFileChange = (event: any) => {
        setFile(event.target.files[0])
    }

    const handleFileUpload = async() => {
        if (file) {
            try {
                const fetchedData = await uploadFile(file)
                console.log("successfully uploaded file", fetchedData)
            } catch (error) {
                console.log("error uploading file", error);
            }
        }
    }

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleFileUpload}>Upload File</button>
        </div>
    )
}

export default FileUploadPage
