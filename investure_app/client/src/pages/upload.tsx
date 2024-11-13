import React, {useState} from 'react'
import { uploadFile } from '../services/API'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import backgroundImage from '../assets/_.jpeg'
import '../styles/UploadPage.css'
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


/**
 * The file upload page allows users to upload an Excel (.xlsx) file.
 * After the file is successfully uploaded, the user is redirected to the `/returns` page.
 *
 * @component
 */

function FileUploadPage() {
    const [file, setFile] = useState<File | null>(null)
    const navigate = useNavigate();

    /**
     * Handles changes in the file input field. When the user selects a file, it updates the `file` state.
     *
     * @function
     * @param {any} event - The change event triggered when a file is selected.
     * @returns {void}
     */
    const handleFileChange = (event: any) => {
        const selectedFile = event.target.files[0]
        setFile(selectedFile)
    }
    /**
     * Handles the file upload process. It checks if the selected file is an `.xlsx` file,
     * uploads it, and then redirects the user to the `/returns` page.
     *
     * If the file is not an `.xlsx` file, an error message is shown.
     *
     * @async
     * @function
     * @returns {Promise<void>} Resolves after a successful file upload and user redirection.
     * @throws {Error} Throws an error if the file upload fails.
     */
    const handleFileUpload = async() => {
        if (file && file.name.endsWith(".xlsx")) {
            try {
                await uploadFile(file)
                toast.success("File was uploaded successfully!")
                setTimeout( () => { navigate('/returns') }, 1000)
            } catch (error) {
                toast.error("Uh oh... error uploading file")
                throw error;
            }
        }
        else if (file){
            toast.error("Please upload a .xlsx file!")
        }
    }

    return (
        <div
            className="upload-page d-flex align-items-center justify-content-center"
            style={{ backgroundImage: `url(${backgroundImage})`, height: '100vh' }}
        >
            <div><Toaster /></div>
            <div className="upload-card shadow-lg d-flex">
                {/* Upload Section */}
                <div className="upload-area text-center p-4 border-right">
                    <div className="upload-icon mb-3">
                        <i className="fa fa-sharp-duotone fa-solid fa-upload"></i>
                    </div>
                    <h3>Drag and Drop file</h3>
                    <p>or</p>
                    <input
                        type="file"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                        id="fileInput"
                    />
                    <label htmlFor="fileInput" className="btn btn-primary">
                        Browse
                    </label>
                </div>
                {/* File Details Section */}
                <div className="file-details d-flex flex-column p-4 w-100 align-items-center justify-content-center">
                    {file ? (
                        <div className="d-flex justify-content-between align-items-center my-2">
                            <div className="file-info d-flex align-items-center">
                                <div>
                                    <div className="file-name">{file.name}</div>
                                    <div className="file-size text-muted">
                                        {((file.size / 1024).toFixed(2))} KB
                                    </div>
                                </div>
                            </div>
                            <span className="text-danger" onClick={() => setFile(null)}>✕</span>
                        </div>
                    ) : (
                        <p className="text-muted text-center">No file selected</p>
                    )}
                    <button
                        className="btn btn-primary w-100 mt-3"
                        onClick={handleFileUpload}
                        disabled={!file}
                    >
                        Upload File
                    </button>
                </div>
            </div>
        </div>
    );
}
export default FileUploadPage
