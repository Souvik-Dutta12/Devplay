import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Nav from './components/Nav'
import MobileDock from './components/MobileDock'
import 'remixicon/fonts/remixicon.css'
import Signup from './pages/Signup'
import Login from './pages/Login'

const App = () => {
  return (
    <div className='w-[100vw] md:w-screen h-auto relative flex'>






      {/* <Routes>
      <Route path='/signup' element={<Signup />}/>
      <Route path='/login' element={<Login />}/>
      </Routes> */}







      <Nav />

      {/* Desktop Sidebar */}
      <div className='w-1/7 z-90 absolute top-0 pt-0 h-screen bg-base-100 text-base-content hidden md:flex justify-center'>
        <ul className="space-y-3 mt-30">
          <p><Link to={'/'} className="btn bg-base-100 border-0 hover:bg-base-200 text-base-content w-full text-md"><i className="ri-home-4-fill text-md"></i>Home</Link></p>
          <p><Link to={'/subscriptions'} className="btn bg-base-100 border-0 hover:bg-base-200 text-base-content w-full text-md"><i className="ri-price-tag-3-line text-md"></i>Subscriptions</Link></p>
          <p><Link to={'/playlists'} className="btn bg-base-100 border-0 hover:bg-base-200 text-base-content w-full text-md"><i className="ri-play-list-2-line text-md"></i>Playlists</Link></p>
          <p><Link to={'/your-videos'} className="btn bg-base-100 border-0 hover:bg-base-200 text-base-content w-full text-md"><i className="ri-movie-line text-md"></i>Your Videos</Link></p>
          <p><Link to={'/liked-videos'} className="btn bg-base-100 border-0 hover:bg-base-200 text-base-content w-full text-md"><i className="ri-thumb-up-line text-md"></i>Liked Videos</Link></p>
          <p><Link to={'/history'} className="btn bg-base-100 border-0 hover:bg-base-200 text-base-content w-full text-md"><i className="ri-history-line text-md"></i>History</Link></p>
        </ul>
      </div>

      {/* Main Content */}
      <div className='w-[100vw] md:w-6/7 h-screen absolute left-0 md:left-50 py-10 px-3 bg-base-200'>
        <Routes>
          <Route path='/' element={<Home />} />

          <Route path='/subscriptions' element={<Home />} />
          <Route path='/playlists' element={<Home />} />
          <Route path='/your-videos' element={<Home />} />
          <Route path='/liked-videos' element={<Home />} />
          <Route path='/history' element={<Home />} />
        </Routes>
      </div>

      {/* Mobile Bottom Dock */}
      <MobileDock />
    </div>




  )
}

export default App
