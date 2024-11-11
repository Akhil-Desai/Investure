import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import FileUploadPage from './pages/Upload'
import ReturnsPage from './pages/Returns';

function App() {
  const [fileUploaded, setFileUploaded] = useState(false)

  const handleFileUploadSuccess = () => {
    setFileUploaded(true)
  }
  return (
    <Router>
        <Routes>
            <Route path='/' element={<FileUploadPage onFileUpload={handleFileUploadSuccess} />} />
            <Route path='/protected' element={fileUploaded ? <ReturnsPage /> : <Navigate to='/' />} />
        </Routes>
    </Router>
  )

}

export default App;
