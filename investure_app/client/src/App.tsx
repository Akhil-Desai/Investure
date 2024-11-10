import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import FileUploadPage from './pages/upload'

function App() {
  return (
    <Router>
        <Routes>
            <Route path='/upload' element={<FileUploadPage />} />
        </Routes>
    </Router>
  )

}

export default App;
