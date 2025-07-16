import React from 'react'

const LikedVideo = () => {
    return (
        <div className=' w-full relative flex flex-col md:flex-row gap-3'>
            <div className="left w-full md:w-1/3 h-[50vh] md:h-[82vh] bg-base-300 border border-base-100/10 shadow-xl shadow-base-100 rounded-xl md:fixed md:mx-3 md:my-1 flex flex-col items-center">
                <div className="relative w-[60%] min-w-[160px] aspect-video rounded-lg overflow-hidden mt-20">
                    <img src="https://i.ytimg.com/vi/aqz-KE-bpKQ/mqdefault.jpg" alt="" className="w-full h-full object-cover" />
                </div>
                <div className='flex flex-col '>
                    <h1 className='text-4xl font-bold mt-7'>Liked videos</h1>
                    <p className='font-bold mt-5'>DEBASIS DUTTA</p>
                    <div className='flex gap-3 text-sm font-normal mt-2'>
                        <p>327 videos </p>
                        <p> No views </p>
                        <p> Updated yesterday</p>
                    </div>

                    <div className="btns flex gap-5 mt-3">
                        <button className='btn btn-primary px-4 py-3 text-lg rounded-full flex items-center justify-center'><i className="ri-play-mini-fill"></i>Play all</button>
                        <button className='btn btn-outline btn-primary px-4 py-3 text-lg rounded-full duration-500 flex items-center justify-center'><i className="ri-shuffle-line"></i>Shuffle</button>
                    </div>
                </div>
            </div>
            <div className="right w-full md:w-2/3 md:ml-[42%] flex flex-col gap-3 p-3">
                {[...Array(25)].map((_, i) => (
                    <div className="flex items-start gap-4 w-full max-w-4xl p-2 bg-base-300 rounded-lg cursor-pointer hover:bg-base-300/50 transition-all">

                        {/* Thumbnail */}
                        <div className="relative w-40 min-w-[160px] aspect-video rounded-lg overflow-hidden">
                            <img
                                src="https://i.ytimg.com/vi/aqz-KE-bpKQ/mqdefault.jpg"
                                alt="Thumbnail"
                                className="w-full h-full object-cover"
                            />

                            {/* Duration badge */}
                            <span className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
                                0:58
                            </span>

                            {/* Progress bar */}
                            <div className="absolute bottom-0 left-0 h-[3px]  w-[45%]"></div>
                        </div>

                        {/* Video Info */}
                        <div className="flex-1 text-content">
                            <h3 className="text-base font-semibold line-clamp-2 leading-snug">
                                ছেলেদের আলাদাভাবে দায়িত্ববোধ শেখাতে হয় না। কলমেঃ জামীউল ইমান...
                            </h3>
                            <p className="text-sm text-white mt-1">শব্দ শিল্প • 841K views • 11 days ago</p>
                        </div>

                        {/* Options button (3 dots) */}
                        <div className="ml-auto text-content hover:text-white cursor-pointer px-2">
                            <i className="ri-more-line text-xl"></i>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    )
}

export default LikedVideo
