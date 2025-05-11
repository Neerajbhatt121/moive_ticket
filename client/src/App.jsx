import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import Homepage from './pages/Homepage'
import MoiveDetails from './pages/user/MoiveDetails'

const App = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homepage/>}/>
          <Route path='/Signup' element={<Signup/>}/>
          <Route path='/Login' element={<Login/>}/>
          <Route path='/moiveDetails/:movId' element={<MoiveDetails/>}/>
          
        </Routes>
    </BrowserRouter>
  )
}

export default App
