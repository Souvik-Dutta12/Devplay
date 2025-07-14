import React from 'react'
import {Link} from 'react-router-dom'

const PlaylistCard = () => {
  return (
    <>
      <div className='w-full sm:w-[320px]  flex flex-col cursor-pointer transition-transform hover:scale-[1.02] '>

        {/* Parent wrapper to center both stack and text */}
        <div className="w-full mx-auto ">

          {/* STACK */}
          <div className="stack stack-top  w-full">
            {/* First Card */}
            <div className="border-base-content card bg-base-100 border text-center">
              <div className="card-body p-0 overflow-hidden relative">
                <img
                  src="https://i.pinimg.com/originals/04/fd/6b/04fd6bffded88d76c6e3e0dadeb9e070.jpg"
                  alt="Playlist Cover"
                  className="w-full h-full object-cover rounded-xl"
                />
                <h1 className='absolute bottom-1 right-2 flex gap-2 text-sm bg-base-100/60 rounded-md p-1 '>
                  <i className="ri-play-large-line"></i>81 videos
                </h1>
              </div>
            </div>

            {/* Second and Third Cards (Optional) */}
            <div className="border-base-content card bg-base-100 border text-center">
              <div className="card-body">B</div>
            </div>
            <div className="border-base-content card bg-base-100 border text-center">
              <div className="card-body">C</div>
            </div>
          </div>

          {/* TEXT CONTENT */}
          <div className="flex gap-3 mt-3">
            <div className="flex flex-col text-sm p-1">
              <h3 className="font-bold text-base text-content line-clamp-2">Design and Analysis of algorithms (DAA)</h3>
              <span className="text-content">Tending to Infinity • Playlist</span>
              <span className="text-sm text-content "><Link to={'/play-content'} className='hover:font-bold hover:underline duration-300 '>View full playlist
              </Link></span>
            </div>
          </div>

        </div>
      </div>

    </>
  )
}

export default PlaylistCard
