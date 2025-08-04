import React, { useState } from 'react'
import 'remixicon/fonts/remixicon.css'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Video from './pages/Video'
import Profile from './pages/Profile'
import Signup from './pages/Signup'
import Login from './pages/Login'
import UploadVideo from './pages/UploadVideo'

const App = () => {

  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div>

      <Routes>
        <Route path='/signup' element={<Signup />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/upload' element={<UploadVideo />}/>
      </Routes>

      <Navbar setSidebarOpen={setSidebarOpen}/>

      <Routes>
        <Route path='/' element={<Home sidebarOpen={sidebarOpen}  setSidebarOpen={setSidebarOpen}/>}/>
        <Route path='/video/:categoryId/:videoId' element={<Video sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>}/>
        <Route path='/profile' element={<Profile sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>}/>
        
        
      </Routes>

    </div>
  )
}

export default App
