import React, {useState } from 'react'
import { uploadFile } from '../services/API'
import 'bootstrap/dist/css/bootstrap.min.css';
import backgroundImage from '../assets/_.jpeg'
import '../styles/UploadPage.css'
import toast, { Toaster } from 'react-hot-toast';


type callback = () => void

function FileUploadPage( {onFileUpload} : {onFileUpload: callback }) {
    const [file, setFile] = useState(null)

    const handleFileChange = (event: any) => {
        setFile(event.target.files[0])
    }

    const handleFileUpload = async() => {
        if (file) {
            try {
                const fetchedData = await uploadFile(file)
                onFileUpload()
                toast.success("File was uploaded successfully!")
                console.log("successfully uploaded file", fetchedData)
            } catch (error) {
                toast.error("Uh oh... error uploading file")
                console.log("error uploading file", error);
            }
        }
    }

    return (
        <div
            className="upload-page"
            style={{backgroundImage: `url(${backgroundImage})`}}
            >
            <div><Toaster /></div>
            <div className="upload-card p-5 shadow-lg">
                <h3 className="text-center mb-4">Upload Your File</h3>
                <div className="mb-3">
                    <input
                        type="file"
                        onChange={handleFileChange}
                    />
                </div>
                <button
                    className="btn btn-primary w-100"
                    onClick={handleFileUpload}
                >
                    Upload File
                </button>
            </div>
        </div>
    );
}

export default FileUploadPage
