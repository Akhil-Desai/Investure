import { HashRouter as Router, Route, Routes} from 'react-router-dom';
import FileUploadPage from './pages/Upload'
import ReturnsPage from './pages/Returns';

function App() {

  return (
    <Router>
        <Routes>
            <Route path='/' element={<FileUploadPage />} />
            <Route path="/returns" element={<ReturnsPage />} />
        </Routes>
    </Router>
  )

}

export default App;
