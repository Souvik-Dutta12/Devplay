import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const MobileDock = () => {
    const location = useLocation()

    const isActive = (path) => location.pathname === path

    return (
        <div className="dock fixed bottom-0 h-20 left-0 w-full z-50 bg-base-100 border-t border-base-300 flex justify-around py-2 md:hidden">
            <Link to="/" className={isActive('/') ? 'dock-active ' : ''}>
                <i className="ri-home-4-fill text-xl"></i>
                <span className="dock-label text-xs">Home</span>
            </Link>

            <Link to="/subscriptions" className={isActive('/subscriptions') ? 'dock-active ' : ''}>
                <i className="ri-price-tag-3-line text-xl"></i>
                <span className="dock-label text-xs">Subs</span>
            </Link>

            <Link to={'/'} className='bg-base-300 border-4 border-base-100 rounded-full p-0 w-auto h-20 flex items-center justify-center -mt-15'>
                <i className="ri-add-line mr-1 text-3xl"></i>
            </Link>

            <Link to="/playlists" className={isActive('/playlists') ? 'dock-active ' : ''}>
                <i className="ri-play-list-2-line text-xl"></i>
                <span className="dock-label text-xs">Playlists</span>
            </Link>



            {/* <Link to="/your-videos" className={isActive('/your-videos') ? 'dock-active' : ''}>
        <i className="ri-movie-line text-xl"></i>
        <span className="dock-label text-xs">Videos</span>
      </Link>

      <Link to="/liked-videos" className={isActive('/liked-videos') ? 'dock-active' : ''}>
        <i className="ri-thumb-up-line text-xl"></i>
        <span className="dock-label text-xs">Liked</span>
      </Link> */}

            <Link to="/history" className={isActive('/history') ? 'dock-active ' : ''}>
                <i className="ri-history-line text-xl"></i>
                <span className="dock-label text-xs">History</span>
            </Link>
        </div>
    )
}

export default MobileDock
