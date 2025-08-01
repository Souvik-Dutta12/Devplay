import React, { useState } from 'react'
import 'remixicon/fonts/remixicon.css'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Video from './pages/Video'
import Profile from './pages/Profile'

const App = () => {

  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div>
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
