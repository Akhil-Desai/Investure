import React, {useState } from 'react'
import { uploadFile } from '../services/API'
import 'bootstrap/dist/css/bootstrap.min.css';
import backgroundImage from '../assets/_.jpeg'
import '../styles/UploadPage.css'


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
                //Add a toast for sucessfull fileupload
                console.log("successfully uploaded file", fetchedData)
            } catch (error) {
                //Add toast for error
                console.log("error uploading file", error);
            }
        }
    }

    return (
        <div
            className="upload-page"
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
            >
            <div
            className="card p-5 shadow-lg"
            style={{
                maxWidth: '400px',
                width: '100%',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                borderRadius: '15px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              }}
            >
                <h3 className="text-center mb-4">Upload Your File</h3>
                <div className="mb-3">
                    <input
                        type="file"
                        className="form-control"
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
