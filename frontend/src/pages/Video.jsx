import React,{useState} from 'react'
import PlayVideo from '../components/PlayVideo'
import Recomended from '../components/Recomended'
import { useParams } from 'react-router-dom'
import Sidebar from '../components/Sidebar'

const Video = ({ sidebarOpen, setSidebarOpen }) => {
const [category, setCategory] = useState("")


  return (
    <div className='px-0 py-7 flex flex-col md:flex-row justify-between gap-5'>
      <Sidebar sidebarOpen={sidebarOpen} category={category} setCategory={setCategory}/>
      <div className={`  pr-0 md:pr-3 pt-2 pb-2 gap-3 duration-500 flex flex-col md:flex-row ${sidebarOpen ? 'pl-0 md:pl-75' : 'pl-0 md:pl-25'}`}>
        <PlayVideo setSidebarOpen={setSidebarOpen} />
        <Recomended />
      </div>
    </div>
  )
}

export default Video
