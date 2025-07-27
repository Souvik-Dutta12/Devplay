import React, { useEffect, useState } from 'react'
import axios from 'axios';
import moment from 'moment';

const PlayVideo = ({videoId}) => {

    const [vidData,setVidData] = useState(null);
    const [channelData,setChannelData] = useState(null);
    const [comments,setComments] = useState([]);

    const fetchVideoData = async () =>{
        const res = await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`);


        setVidData(res.data.items[0])

    }

    const fetchChannelData = async () =>{
        const res = await axios.get(`https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics&id=${vidData?.snippet?.channelId}&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`)

        setChannelData(res.data.items[0])
    }

    const fetchComments = async () => {
        const res = await axios.get(`https://www.googleapis.com/youtube/v3/commentThreads?part=snippet,contentDetails,statistics&id=${videoId}&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`)

        setComments(res.data.items)

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
        fetchVideoData()
        fetchChannelData()
        fetchComments()
    },[vidData])

    return (
        <div className='w-full  md:w-2/3'>
           <iframe className='w-full h-1/3 rounded-xl' src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"  ></iframe>
            <h3 className='text-2xl font-bold mt-3'>{vidData?vidData.snippet.title:"Tittle here"}</h3>
            <div className="flex items-center justify-between flex-wrap mt-1 text-sm text-base-content/60">
                <p>{vidData?valueConverter(vidData.statistics.viewCount):"16K"} Views &bull; {vidData?.snippet?.publishedAt && moment(vidData.snippet.publishedAt).fromNow()}</p>

            </div>

            <div className='flex flex-col md:flex-row gap-5 md:gap-0 items-center justify-between mt-3'>
                <div className='flex'>
                    <img src={channelData?.snippet?.thumbnails?.default.url} className="ri-user-line flex items-center justify-center text-2xl bg-base-300 rounded-full w-12 h-12 text-center "/>
                    <div className='flex  ml-3 justify-between gap-20'>
                        <div className='flex flex-col gap-0 '>
                            <p className='font-bold text-lg'>{vidData?.snippet?.channelTitle}</p>
                            <span className='text-base-content/60 text-sm'>{valueConverter(channelData?.statistics?.subscriberCount)} Subscribers</span>
                        </div>
                        <button className='btn btn-primary rounded-full'>Subscribe</button>
                    </div>
                </div>
                <div className='flex items-center gap-3'>
                    <button className='btn flex items-center justify-center rounded-full'>
                        <i className="ri-thumb-up-line text-xl "></i>{valueConverter(vidData?.statistics?.likeCount)}
                    </button>
                    <button className='btn flex items-center justify-center rounded-full'>
                        <i className="ri-thumb-down-line text-xl "></i>
                    </button>
                    <button className='btn flex items-center justify-center rounded-full'>
                        <i className="ri-share-forward-line text-xl "></i>Share
                    </button>
                    <button className='btn flex items-center justify-center rounded-full'>
                        <i className="ri-download-line text-xl "></i>Download
                    </button>
                </div>
            </div>
            <hr className='mt-3' />
            <div className='mt-3 mx-2 px-5 py-2 bg-base-300 rounded-xl'>
                <p>{vidData?.snippet?.description.slice(0,250)}<span className='text-base-content/60 hover:underline hover:text-base-content hover:font-bold cursor-pointer duration-300'>See more ...</span></p>
            </div>
            <div className='mt-5 flex flex-col'>

                <h4 className='text-2xl font-bold'>{valueConverter(vidData?.statistics?.commentCount)} Comments</h4>
                
                <div className='flex flex-col gap-3 items-center justify-between mt-3'>
                   {
                    comments.map((comment, index) => (
                         <div className='flex' key={index}>
                        <img src={comment?.snippet?.topLevelComment?.snippet?.authorProfileImageUrl} className="ri-user-line flex items-center justify-center text-2xl bg-base-300 rounded-full w-12 h-12 text-center flex-shrink-0"/>
                        <div className='flex flex-col ml-3'>
                            <h3 className='font-bold'>{comment?.snippet?.topLevelComment?.snippet?.authorDisplayName} <span className='text-sm text-base-content/60 font-normal ml-3'>1 day ago</span></h3>
                            <p className='flex flex-wrap'>{comment?.snippet?.topLevelComment?.snippet?.textDisplay}</p>
                            <div className="cmnt-action flex gap-5 items-center text-base-content/60 mt-2">
                                <span className='cursor-pointer flex items-center justify-center gap-1  duration-300 hover:text-base-content hover:font-bold'>
                                    <i className="ri-thumb-up-line"></i>
                                <span>{valueConverter(comment?.snippet?.topLevelComment?.snippet?.likeCount)}</span>
                                </span>

                                <span className='cursor-pointer hover:text-base-content hover:font-bold duration-300 '>
                                    <i className="ri-thumb-down-line"></i>
                                </span>
                                <span className='cursor-pointer hover:text-base-content hover:font-bold duration-300 '>Reply</span>
                            </div>

                        </div>
                    </div>
                    ))
                   }

                </div>
            </div>
        </div>
    )
}

export default PlayVideo
