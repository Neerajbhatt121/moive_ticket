import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import LayoutAdmin from './Components/LayoutAdmin'
import AddMovies from './pages/Admin/AddMovies'
import AdminDashboard from './pages/Admin/AdminDashboard'
import AdminPanel from './pages/Admin/AdminPanel'
import CreateInstance from './pages/Admin/CreateInstance'
import Movies from './pages/Admin/Movies'
import Login from './pages/auth/Login'
import OauthSuccess from './pages/auth/OauthSuccess'
import Signup from './pages/auth/Signup'
import Homepage from './pages/Homepage'
import MoiveDetails from './pages/user/MoiveDetails'
import SeatBooking from './pages/user/SeatBooking'

const App = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homepage/>}/>
          <Route path='/Signup' element={<Signup/>}/>
          <Route path='/Login' element={<Login/>}/>
          <Route path='/moiveDetails/:movId' element={<MoiveDetails/>}/>
          <Route path='/bokking/:movId' element={<SeatBooking/>}/>
          <Route path='/oauth-success' element={<OauthSuccess/>}/>


          <Route element={<LayoutAdmin/>}>
            <Route path='/AdminPanel' element={<AdminPanel/>}/>
            <Route path='/dashboard' element={<AdminDashboard/>}/>

            <Route element={<Movies/>}>
                <Route path='/dashboard/movie' element={<AddMovies/>}/>
                <Route path='/dashboard/createInstance' element={<CreateInstance/>}/>
            </Route>

          </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App
