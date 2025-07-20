import { HashRouter, Route, Routes } from 'react-router-dom'
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
import SearchResultpage from './pages/user/SearchResultpage'
import SeatBooking from './pages/user/SeatBooking'
import Tickets from './pages/user/Tickets'
import WeakCalender from './pages/user/WeakCalander'

const App = () => {
  return (
    <HashRouter>
        <Routes>
          <Route path='/' element={<Homepage/>}/>
          <Route path='/Signup' element={<Signup/>}/>
          <Route path='/Login' element={<Login/>}/>
          <Route path='/moiveDetails/:movId' element={<MoiveDetails/>}/>
          <Route path='/booking/:movId' element={<SeatBooking/>}/>
          <Route path='/booking/:movId/:Mdate/:slotTime' element={<SeatBooking/>}/>
          <Route path='/oauth-success' element={<OauthSuccess/>}/>
          <Route path='/search-page' element={<SearchResultpage/>}/>
          <Route path='/weakCalender' element={<WeakCalender/>}/>
          <Route path='/tickets' element={<Tickets/>}/>
          
          <Route element={<LayoutAdmin/>}>
            <Route path='/AdminPanel' element={<AdminPanel/>}/>
            <Route path='/dashboard' element={<AdminDashboard/>}/>

            <Route element={<Movies/>}>
                <Route path='/dashboard/movie' element={<AddMovies/>}/>
                <Route path='/dashboard/createInstance' element={<CreateInstance/>}/>
            </Route>

          </Route>
          <Route path="*" element={<h1>404 - Page Not Found hehehehehe</h1>} />
        </Routes>
    </HashRouter>
  )
}

export default App
