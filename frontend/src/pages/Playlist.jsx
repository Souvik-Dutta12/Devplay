import React from 'react'
import PlaylistCard from '../components/PlaylistCard'

const Playlist = () => {
  return (
    <div className='w-full h-auto flex flex-col'>
      <div className='px-0 md:px-10 flex flex-col gap-3 md:flex-row md:justify-between md:items-center'>
        <h1 className='px-4 py-2 text-5xl font-semibold'>Playlists</h1>

        <div className="dropdown px-4 py-1 mr-20">
          <label tabIndex={0} className="btn btn-outline bg-base-100 m-1">
            A-Z<i className="ri-arrow-down-s-line"></i>
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li><div >A-Z</div></li>
            <li><div >Recently Added</div></li>

          </ul>
        </div>
      </div>



      <div className="vids w-full min-h-screen mt-3 mx-auto ">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 p-3">
          {[...Array(20)].map((_, index) => (
            <div key={index} className=' flex items-center justify-center rounded-md p-2'>
              <PlaylistCard />
            </div>

          ))}
        </div>
      </div>



    </div>



  )
}

export default Playlist
