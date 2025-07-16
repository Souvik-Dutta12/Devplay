import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Nav from './components/Nav'
import MobileDock from './components/MobileDock'
import 'remixicon/fonts/remixicon.css'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Subscription from './pages/Subscription'
import Playlist from './pages/Playlist'
import YourVideo from './pages/YourVideo'
import LikedVideo from './pages/LikedVideo'
import History from './pages/History'

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
      <div className='scroll-container w-[100vw] md:w-6/7 min-h-screen max-h-screen absolute left-0 md:left-50 py-40 md:py-27 pr-0 md:pr-3 pl-0 md:pl-8  bg-base-200 overflow-y-auto '>
        <Routes>
          <Route path='/' element={<Home />} />

          <Route path='/subscriptions' element={<Subscription />} />
          <Route path='/playlists' element={<Playlist />} />
          <Route path='/your-videos' element={<YourVideo />} />
          <Route path='/liked-videos' element={<LikedVideo />} />
          <Route path='/history' element={<History />} />
        </Routes>
      </div>

      {/* Mobile Bottom Dock */}
      <MobileDock />
    </div>




  )
}

export default App
