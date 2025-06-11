import {Routes, Route} from 'react-router-dom';
import Register from './components/register/Register';
import Login from './components/login/Login';
import Home from './components/home/Home';


function App() {
  

  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  )
}

export default App
