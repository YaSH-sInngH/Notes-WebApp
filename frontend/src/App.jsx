import {Routes, Route} from 'react-router-dom';
import Home from './components/home/Home';
import Dashboard from './components/dashboard/Dashboard';

function App() {
  

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} /> 
    </Routes>
  )
}

export default App
