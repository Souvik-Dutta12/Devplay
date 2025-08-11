import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import thumbnail from '/thumbnil.jpeg'
import { Link, useParams } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import { toast } from 'react-toastify'
import { formatViews, timeAgo } from '../common/common.js'
const Profile = ({ sidebarOpen, setSidebarOpen }) => {

  const { user, axios, token } = useAppContext();
  const { userId } = useParams();
  const [channelData, setChannelData] = useState();
  const [videos, setVideos] = useState([]);

  const fetchUser = async () => {
    try {
      const res = await axios.get(`/users/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setChannelData(res.data.data);
    } catch (error) {
      toast.error("Failed to fetch channel details");
    }
  };

  const fetchVideos = async ({
    query = "",
    sortBy = "createdAt",
    sortType = "desc",
    userId: paramUserId = userId, // rename param to avoid conflict
  } = {}) => {
    try {
      const params = {};
      if (query) params.query = query;
      if (paramUserId) params.userId = paramUserId;
      if (sortBy) params.sortBy = sortBy;
      if (sortType) params.sortType = sortType;




      const res = await axios.get("/videos/", {
        params,
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res?.data?.success) {
        setVideos(res.data.data);

      } else {
        toast.error(res.data?.message || "Failed to fetch videos");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    if (!token) return;
    fetchVideos();
  }, [user, token,userId]);

  useEffect(() => {
    if (!token) return;
    fetchUser();
  }, [token, userId])

  return (
    user && (
      <>
        <Sidebar sidebarOpen={sidebarOpen} />

        <div className={`  mt-5 pr-0 md:pr-3 pt-2 pb-2 duration-500 flex flex-col gap-7 ${sidebarOpen ? 'pl-0 md:pl-75 mx-5 md:mx-25' : 'pl-0 md:pl-25 mx-5 md:mx-30'}`}>
          <div className='w-full  h-40 rounded-xl overflow-hidden'>
            <img className='w-full h-full object-cover' src={channelData?.coverImage || thumbnail} alt="" />
          </div>

          <div className='w-full h-auto flex flex-col md:flex-row gap-3 items-center '>

            <div className='w-45 h-45 rounded-full overflow-hidden'>
              <img className='w-auto h-full object-center ' src={channelData?.avatar || thumbnail} alt="" />
            </div>
            <div className='flex flex-col gap-2  items-center md:items-start'>
              <h1 className='text-5xl font-bold'>{channelData?.channelName}</h1>
              <div className='text-md '>
                <b>@{channelData?.username}</b> &bull; <span className='text-base-content/60'>{formatViews(channelData?.subscribers?.length)} subscribers</span> &bull; <span className='text-base-content/60'>{formatViews(channelData?.videos?.length)} videos</span>
              </div>
              <p className='text-md'>{channelData?.description}</p>
              <button className='btn btn-primary rounded-full w-35'>Subscribe</button>
            </div>
          </div>

          <span className='text-2xl m-0'>Videos</span>
          <hr className='-mt-5' />

          <div className='w-full h-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-1'>


            {
              videos.length === 0 ? (<div className='text-5xl w-[1200px]  font-bold text-center'>No Videos Yet</div>) :
              videos.map((video, index) => (
                <Link to={`/videos/${video?._id}`} className='card hover:bg-base-300/60 hover:scale-[1.02] p-3 flex flex-col items-center justify-center duration-500'
                  onClick={() => setSidebarOpen(false)}
                  key={video?._id}>
                  <img className='w-[95%] max-h-40 rounded-xl' src={video?.thumbnail || thumbnail} 
                    alt={video?.title || "Video thumbnail"} />
                  <div className='w-[95%]'>
                    <div className='flex justify-between '>
                      <h2 className='text-lg font-bold mt-2'>{video?.title}</h2>
                      <i className="ri-more-2-line text-lg mt-2 font-bold"></i>
                    </div>

                    <h3 className='text-md font-semibold text-base-content/60 hover:text-base-content cursor-pointer duration-200'>{video?.description?.slice(0,30)}</h3>
                    <p className='text-sm font-semibold text-base-content/60'>
                      {formatViews(video?.views)} views &bull; {timeAgo(video?.createdAt)}
                    </p>

                  </div>
                </Link>

              ))

            }
          </div>

        </div>
      </>)
  )
}

export default Profile
