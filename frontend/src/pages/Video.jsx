import React from 'react'
import PlayVideo from '../components/PlayVideo'
import Recomended from '../components/Recomended'
import { useParams } from 'react-router-dom'

const Video = () => {

  const {videoId, categoryId} = useParams();

  return (
    <div className='px-3 md:px-10 py-7 flex flex-col md:flex-row justify-between gap-5'>
        <PlayVideo videoId={videoId} />
        <Recomended />
    </div>
  )
}

export default Video
