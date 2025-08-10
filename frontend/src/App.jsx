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
import { ToastContainer } from 'react-toastify'
import { useAppContext } from './context/AppContext'


const App = () => {

  const [sidebarOpen, setSidebarOpen] = useState(true);

  const {user} = useAppContext();

  return (
    <div>


<ToastContainer
  position="top-right"
  autoClose={3000}
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  pauseOnHover
  theme="colored" // base theme
/>



      <Navbar setSidebarOpen={setSidebarOpen}/>

      <Routes>
        <Route path='/' element={<Home sidebarOpen={sidebarOpen}  setSidebarOpen={setSidebarOpen}/>}/>
        {
          !user && (<>
            <Route path='/signup' element={<Signup />}/>
        <Route path='/login' element={<Login />}/>
        </>
          )
        }
        <Route path='/upload' element={<UploadVideo />}/>
        <Route path='/videos/:videoId' element={<Video sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>}/>
        <Route path='/profile' element={<Profile sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>}/>
        <Route path='*'element={<div className='text-7xl font-bold '>404 - Page Not Found</div>} />
        
      </Routes>

    </div>
  )
}

export default App
