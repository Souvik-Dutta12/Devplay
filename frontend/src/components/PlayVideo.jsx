import React, { useEffect, useState } from 'react'
import moment from 'moment';
import thumbnail from '/thumbnil.jpeg'
import { useAppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { timeAgo, formatViews } from '../common/common';

const PlayVideo = ({ setSidebarOpen }) => {

    const { videoId } = useParams();
    const { axios, token } = useAppContext();

    const [vidData, setVidData] = useState(null);
    const fetchVideo = async () => {
        if (!token) {
            toast.error("No token found. Please log in.");
            return;
        }

        try {
            const res = await axios.get(`/videos/${videoId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setVidData(res.data.data);
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message || 'Failed to fetch data');
        }
    };

    useEffect(() => {
        if (!token) return;
        fetchVideo();
        setSidebarOpen(false);

        console.log(vidData)
    }, [videoId, token]);


    return (
        <div className='w-full px-3 md:px-0 md:pl-7  md:w-2/3'>
            <iframe className='w-full h-[200px] md:h-[450px] rounded-xl' src={vidData?.videoFile
            } allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"  ></iframe>
            <h3 className='text-2xl font-bold mt-3'>{vidData?.title}</h3>
            <div className="flex items-center justify-between flex-wrap mt-1 text-sm text-base-content/60">
                <p>{formatViews(vidData?.views)} Views &bull; {timeAgo(vidData?.createdAt)}</p>

            </div>

            <div className='flex flex-col md:flex-row gap-5 md:gap-0 items-center justify-between mt-3'>
                <div className='flex'>
                    <img src={vidData?.owner?.avatar} className="ri-user-line flex items-center justify-center text-2xl bg-base-300 rounded-full w-12 h-12 text-center " />
                    <div className='flex  ml-3 justify-between gap-20'>
                        <div className='flex flex-col gap-0 '>
                            <p className='font-bold text-lg'>{vidData?.owner?.channelName}</p>
                            <span className='text-base-content/60 text-sm'>{formatViews(vidData?.owner?.subscribers?.length)} </span>
                        </div>
                        <button className='btn btn-primary rounded-full'>Subscribe</button>
                    </div>
                </div>
                <div className='flex items-center gap-3'>
                    <button className='btn flex items-center justify-center rounded-full'>
                        <i className="ri-thumb-up-line text-xl "></i>{formatViews(vidData?.likes.length)}
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
                <p>{vidData?.description.slice(0, 250)}<span className='text-base-content/60 hover:underline hover:text-base-content hover:font-bold cursor-pointer duration-300'> See more ...</span></p>
            </div>
            <div className='mt-5 flex flex-col'>

                <h4 className='text-2xl font-bold'>{formatViews(vidData?.likes.length)} Comments</h4>

                <div className='flex flex-col gap-3 items-center justify-between mt-3'>
                    {
                        vidData?.comments.map((comment, index) => (
                            <div className='flex' key={index}>
                                <img src={`#`} className="ri-user-line flex items-center justify-center text-2xl bg-base-300 rounded-full w-12 h-12 text-center flex-shrink-0" />
                                <div className='flex flex-col ml-3'>
                                    <h3 className='font-bold'>authorDisplayName <span className='text-sm text-base-content/60 font-normal ml-3'>20 hours ago</span></h3>
                                    <p className='flex flex-wrap'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde, voluptatum. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eligendi, ipsa.</p>
                                    <div className="cmnt-action flex gap-5 items-center text-base-content/60 mt-2">
                                        <span className='cursor-pointer flex items-center justify-center gap-1  duration-300 hover:text-base-content hover:font-bold'>
                                            <i className="ri-thumb-up-line"></i>
                                            <span>30K</span>
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
