import React, { useEffect, useState } from 'react'
import thumbnail from '/thumbnil.jpeg'
import { Link } from 'react-router-dom'
import axios from "axios"
import moment from 'moment'
const Feed = ({ category }) => {


    const [data, setData] = useState([]);

    const fetchVideos = async () => {
        try {
            const res = await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&regionCode=US&videoCategoryId=${category}&maxResults=150&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`)
            setData(res.data.items)
        } catch (error) {
            <div role="alert" className="alert alert-error">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Error! Failed to fetch videos.</span>
            </div>
        }
    }

    const valueConverter = (val)=>{
        if(val >= 1000000) {
            return (val / 1000000).toFixed(1) + 'M';
        }else if(val >= 1000) {
            return (val / 1000).toFixed(1) + 'K';
        }else {
            return val;
        }
    }

    useEffect(()=>{
        fetchVideos()

    },[category])
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-0 md:p-4">
            {
                data.map((item, index) => (
                    <Link to={`/video/${item.snippet.categoryId}/${item.id}`} className='card hover:bg-base-300/60 hover:scale-[1.02] p-3 flex flex-col items-center justify-center duration-500' key={item.id}>
                        <img className='w-[95%] rounded-xl' src={item.snippet.thumbnails.medium.url} alt="" />
                        <div className='w-[95%]'>
                            <div className='flex justify-between '>
                                <h2 className='text-lg font-bold mt-2'>{item.snippet.title}</h2>
                                <i className="ri-more-2-line text-lg mt-2 font-bold"></i>
                            </div>

                            <h3 className='text-md font-semibold text-base-content/60 hover:text-base-content cursor-pointer duration-200'>{item.snippet.channelTitle}</h3>
                           <p className='text-sm font-semibold text-base-content/60'>
  {valueConverter(item.statistics.viewCount)} views &bull; {moment(item.snippet.publishedAt).fromNow()}
</p>

                        </div>
                    </Link>

                ))

            }
        </div>
    )
}

export default Feed
