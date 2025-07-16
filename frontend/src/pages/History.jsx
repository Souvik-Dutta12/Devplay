import React from 'react'

const History = () => {
  return (
    <div className='w-full px-0 md:px-10 h-auto flex flex-col'>
      <div className='flex flex-col md:flex-row gap-3 md:gap-0 items-center justify-between px-4 py-3'>
        <h1 className='text-4xl font-bold'>Watch history</h1>
        <button className='btn btn-primary btn-outline duration-500 rounded-full'><i className="ri-delete-bin-6-line"></i>Clear all watch history</button>
      </div>

      <div className='w-full flex flex-col gap-3'>
        <h1 className='text-3xl px-4 font-bold mt-1'>Today</h1>
            {[...Array(5)].map((_, i) => (
                    <div className="flex items-start gap-4 w-full h-[15vh] md:h-[20vh] p-2 bg-base-300 rounded-lg cursor-pointer hover:bg-base-300/50 transition-all">

                        {/* Thumbnail */}
                        <div className="relative  min-w-[160px] h-full aspect-video rounded-lg overflow-hidden">
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
                            <div className="absolute bottom-0 left-0 h-[3px] bg-red-600 w-[45%]"></div>
                        </div>

                        {/* Video Info */}
                        <div className="flex-1 text-content mt-4 ">
                            <h3 className="text-base  font-bold line-clamp-2 leading-snug">
                                ছেলেদের আলাদাভাবে দায়িত্ববোধ শেখাতে হয় না। কলমেঃ জামীউল ইমান...
                            </h3>
                            <p className="text-sm text-gray-400 mt-1 font-medium">শব্দ শিল্প <i className="ri-checkbox-circle-fill"></i> 841K views</p>
                            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat, illum neque cumque rem modi voluptatem alias porro ea blanditiis necessitatibus.</p>
                        </div>

                        {/* Options button (3 dots) */}
                        <div className="ml-auto text-content  cursor-pointer px-2 flex gap-7 items-center justify-center">
                            <i className="ri-close-large-line hover:text-white"></i>
                            <i className="ri-more-line text-xl hover:text-white"></i>
                        </div>
                    </div>
                ))}
      </div>
      <div className='w-full flex flex-col gap-3'>
        <h1 className='text-3xl px-4 font-bold mt-1'>Monday</h1>
            {[...Array(5)].map((_, i) => (
                    <div className="flex items-start gap-4 w-full h-[15vh] md:h-[20vh] p-2 bg-base-300 rounded-lg cursor-pointer hover:bg-base-300/50 transition-all">

                        {/* Thumbnail */}
                        <div className="relative  min-w-[160px] h-full aspect-video rounded-lg overflow-hidden">
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
                            <div className="absolute bottom-0 left-0 h-[3px] bg-red-600 w-[45%]"></div>
                        </div>

                        {/* Video Info */}
                        <div className="flex-1 text-content mt-4">
                            <h3 className="text-base font-bold line-clamp-2 leading-snug">
                                ছেলেদের আলাদাভাবে দায়িত্ববোধ শেখাতে হয় না। কলমেঃ জামীউল ইমান...
                            </h3>
                            <p className="text-sm text-gray-400 mt-1 font-medium">শব্দ শিল্প <i className="ri-checkbox-circle-fill"></i> 841K views</p>
                            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat, illum neque cumque rem modi voluptatem alias porro ea blanditiis necessitatibus.</p>
                        </div>

                        {/* Options button (3 dots) */}
                        <div className="ml-auto text-content  px-2 flex gap-7 items-center justify-center">
                            <i className="ri-close-large-line cursor-pointer hover:text-white"></i>
                            <i className="ri-more-line text-xl cursor-pointer hover:text-white"></i>
                        </div>
                    </div>
                ))}
      </div>
    </div>
  )
}

export default History
