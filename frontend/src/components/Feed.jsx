import React from 'react'
import thumbnail from '/thumbnil.jpeg'
import { Link } from 'react-router-dom'

const Feed = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-0 md:p-4">
            {
                Array.from({ length: 16 }).map((_, index) => (
                    <Link to={`/video/20/4521`} className='card hover:bg-base-300/60 hover:scale-[1.02] p-3 flex flex-col items-center justify-center duration-500'>
                        <img className='w-[95%] rounded-xl' src={thumbnail} alt="" />
                        <div className='w-[95%]'>
                            <div className='flex justify-between '>
                                <h2 className='text-lg font-bold mt-2'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Suscipit reiciendis dicta fuga, quas nesciunt illum?</h2>
                                <i className="ri-more-2-line text-lg mt-2 font-bold"></i>
                            </div>

                        <h3 className='text-md font-semibold text-base-content/60 hover:text-base-content cursor-pointer duration-200'>Souvik Dutta</h3>
                        <p className='text-sm font-semibold text-base-content/60'>15k views &bull; 2 days ago</p>
                        </div>
                    </Link>

                ))

            }
        </div>
    )
}

export default Feed
