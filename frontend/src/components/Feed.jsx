import React, { useEffect, useState } from 'react'
import thumbnail from '/thumbnil.jpeg'
import { Link } from 'react-router-dom'
import axios from "axios"
import moment from 'moment'
const Feed = ({setSidebarOpen}) => {



    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-0 md:p-4">


            {
                Array.from({length:50}).map((_, index) => (
                    <Link to={`/video/02/10`} className='card hover:bg-base-300/60 hover:scale-[1.02] p-3 flex flex-col items-center justify-center duration-500' 
                    onClick={()=>setSidebarOpen(false)}
                    key={index}>
                        <img className='w-[95%] rounded-xl' src={thumbnail} alt="" />
                        <div className='w-[95%]'>
                            <div className='flex justify-between '>
                                <h2 className='text-lg font-bold mt-2'>Title</h2>
                                <i className="ri-more-2-line text-lg mt-2 font-bold"></i>
                            </div>

                            <h3 className='text-md font-semibold text-base-content/60 hover:text-base-content cursor-pointer duration-200'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex, aut.</h3>
                            <p className='text-sm font-semibold text-base-content/60'>
                                20 K views &bull;20 hours ago
                            </p>

                        </div>
                    </Link>

                ))

            }
        </div>
    )
}

export default Feed
