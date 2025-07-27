import React from 'react'
import PlayVideo from '../components/PlayVideo'
import Recomended from '../components/Recomended'

const Video = () => {
  return (
    <div className='px-3 md:px-10 py-7 flex flex-col md:flex-row justify-between gap-5'>
        <PlayVideo />
        <Recomended />
    </div>
  )
}

export default Video
