import React, { useState } from 'react'
import 'remixicon/fonts/remixicon.css'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Video from './pages/Video'

const App = () => {

  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div>
      <Navbar setSidebarOpen={setSidebarOpen}/>

      <Routes>
        <Route path='/' element={<Home sidebarOpen={sidebarOpen}/>}/>
        <Route path='/video/:categoryId/:videoId' element={<Video />}/>
      </Routes>

    </div>
  )
}

export default App
