import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Homepage from './pages/Homepage'
import MoiveDetails from './pages/user/MoiveDetails'

const App = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homepage/>}/>
          <Route path='/moiveDetails/:movId' element={<MoiveDetails/>}/>
          
        </Routes>
    </BrowserRouter>
  )
}

export default App
