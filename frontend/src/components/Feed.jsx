import React, { useEffect, useState } from 'react'
import thumbnail from '/thumbnil.jpeg'
import { Link } from 'react-router-dom'
import axios from "axios"
import moment from 'moment'
import { useAppContext } from '../context/AppContext'
import { toast } from 'react-toastify'
import { timeAgo,formatViews } from '../common/common.js'
const Feed = ({ setSidebarOpen }) => {

    const [loading, setLoading] = useState(true);
    const { user, token, axios, videos, setVideos } = useAppContext();

    const fetchVideos = async ({
        query = "",
        sortBy = "createdAt",
        sortType = "desc",
        userId = "",
    } = {}) => {
        try {
            const params = {};
            if (query) params.query = query;
            if (userId) params.userId = userId;
            if (sortBy) params.sortBy = sortBy;
            if (sortType) params.sortType = sortType;

            const res = await axios.get("/videos/", { params, headers: { Authorization: `Bearer ${token}` } });
            if (res?.data?.success) {
                setVideos(res.data.data);
                console.log(res.data.data)
            } else {
                toast.error(res.data?.message || "Failed to fetch videos");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    };
    useEffect(() => {
        if (user && token) {
            fetchVideos();
        }
    }, [user, token]);


    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-0 md:p-4">


            {
                videos.map((video, index) => (
                    <Link to={`/videos/${video._id}`} className='card hover:bg-base-300/60 hover:scale-[1.02] p-3 flex flex-col items-center justify-center duration-500'
                        onClick={() => setSidebarOpen(false)}
                        key={index}>
                        <img className='w-[95%] max-h-63 rounded-xl' src={video.thumbnail} alt="" />
                        <div className='w-[95%]'>
                            <div className='flex justify-between '>
                                <h2 className='text-lg font-bold mt-2'>{video.title}</h2>
                                <i className="ri-more-2-line text-lg mt-2 font-bold"></i>
                            </div>

                            <h3 className='text-md font-semibold  text-base-content/60 hover:text-base-content cursor-pointer duration-200'>{video.description.slice(0, 50)}</h3>
                            <p className='text-sm font-semibold text-base-content/60'>
                                {formatViews(video.views)} views &bull;{timeAgo(video.createdAt)}
                            </p>

                        </div>
                    </Link>

                ))

            }
        </div>
    )
}

export default Feed
