import React from 'react'
import 'remixicon/fonts/remixicon.css'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Video from './pages/Video'

const App = () => {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/video/:categoryId/:videoId' element={<Video />}/>
      </Routes>

    </div>
  )
}

export default App
