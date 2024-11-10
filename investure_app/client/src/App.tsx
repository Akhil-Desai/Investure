import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import FileUploadPage from './pages/upload'
import ReturnsPage from './pages/returns';

function App() {
  return (
    <Router>
        <Routes>
            <Route path='/upload' element={<FileUploadPage />} />
            <Route path='/totalReturns' element={<ReturnsPage />} />
        </Routes>
    </Router>
  )

}

export default App;
