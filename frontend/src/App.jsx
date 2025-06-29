import {Routes, Route} from 'react-router-dom';
import Home from './components/home/Home';
import Dashboard from './components/dashboard/Dashboard';
import ShareNote from './components/dashboard/ShareNote';
import { ToastContainer } from 'react-toastify';

function App() {
  

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} /> 
      <Route path="/share/:id" element={<ShareNote />} />
    </Routes>
    </>
  )
}

export default App
