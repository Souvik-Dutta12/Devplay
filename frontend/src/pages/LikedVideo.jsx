import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import { Navigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import { formatViews,timeAgo } from '../common/common'

const LikedVideo = ({sidebarOpen,setSidebarOpen}) => {
  const [category,setCategory] = useState("")
  const [videos, setVideos] = useState([]);

  const {axios,user,token} = useAppContext()

const fetchLikedVideos = async () => {
  try {
    const res = await axios.get("/videos/likeVideo", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });


    if (res?.data?.success) {
      setVideos(res.data.data); // store liked videos in state
    } else {
      toast.error(res.data?.message || "Failed to fetch liked videos");
    }
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to fetch liked videos");
  }
};

  useEffect(()=>{
    if(!token) return;
    fetchLikedVideos()
  },[user,token])

  return (
    user ? (
        <>
        <Sidebar sidebarOpen={sidebarOpen} category={category} setCategory={setCategory}/>

      <div className={` pr-0 md:pr-3 pt-2 pb-2 duration-500 ${sidebarOpen ? 'pl-0 md:pl-75' : 'pl-0 md:pl-25'}`}>

        <span className='text-3xl p-5 font-bold'>Liked Videos</span>
          <hr className='mt-5' />
        <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4 p-0 md:p-4'>

            

            { 
              videos.length === 0 ? (<div className='text-5xl w-[1200px]  font-bold text-center'>No Videos Yet</div>) :
                videos.map((video, index) => (
                    <Link to={`/videos/${video._id}`} className='card hover:bg-base-300/60 hover:scale-[1.02] p-3 flex flex-col items-center justify-center duration-500'
                        onClick={() => setSidebarOpen(false)}
                        key={video._id}>
                        <img className='w-[95%] h-65 rounded-xl object-center' src={video.thumbnail} alt="" />
                        <div className='w-[95%] flex gap-3 items-center'>
                            <img src={video?.owner?.avatar} alt="" className='w-15 h-15 rounded-full' />
                            <div className='w-full'>
                                <div className='flex justify-between '>
                                    <h2 className='text-lg font-bold mt-2'>{video.title}</h2>
                                    <i className="ri-more-2-line text-lg mt-2 font-bold"></i>
                                </div>
                                <h3 className='text-md font-semibold  text-base-content/60 hover:text-base-content cursor-pointer duration-200'>{video?.owner?.channelName}</h3>
                                <p className='text-sm font-semibold text-base-content/60'>
                                    {formatViews(video.views)} views &bull;{timeAgo(video.createdAt)}
                                </p>
                            </div>

                        </div>
                    </Link>

                ))

            }

        </div>
      </div>
    </>
    ):<Navigate to={"/signup"}/>
  )
}

export default LikedVideo
