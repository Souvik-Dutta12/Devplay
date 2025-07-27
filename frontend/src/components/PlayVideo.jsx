import React from 'react'

const PlayVideo = () => {
    return (
        <div className='w-full  md:w-2/3'>
            <video className='w-full rounded-xl' src="demo.mp4" controls autoPlay muted></video>
            <h3 className='text-2xl font-bold mt-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, dolore! Consequuntur facilis excepturi fugit at!</h3>
            <div className="flex items-center justify-between flex-wrap mt-1 text-sm text-base-content/60">
                <p>1525 Views &bull; 2 days ago</p>

            </div>

            <div className='flex flex-col md:flex-row gap-5 md:gap-0 items-center justify-between mt-3'>
                <div className='flex'>
                    <i className="ri-user-line flex items-center justify-center text-2xl bg-base-300 rounded-full w-12 h-12 text-center "></i>
                    <div className='flex  ml-3 justify-between gap-20'>
                        <div className='flex flex-col gap-0 '>
                            <p className='font-bold text-lg'>Souvik Dutta</p>
                            <span className='text-base-content/60 text-sm'>1M Subscribers</span>
                        </div>
                        <button className='btn btn-primary rounded-full'>Subscribe</button>
                    </div>
                </div>
                <div className='flex items-center gap-3'>
                    <button className='btn flex items-center justify-center rounded-full'>
                        <i className="ri-thumb-up-line text-xl "></i>15k
                    </button>
                    <button className='btn flex items-center justify-center rounded-full'>
                        <i className="ri-thumb-down-line text-xl "></i>15
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
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt quaerat iste repellat, similique velit, nulla odio autem quidem temporibus, aspernatur sapiente? Temporibus deleniti perspiciatis at nostrum dignissimos rerum illum modi?Lorem ipsum dolor sit amet consectetur, adipisicing elit. Velit inventore corporis veniam quam corrupti repellat id rem ipsum error. Esse. <span className='text-base-content/60 hover:underline hover:text-base-content hover:font-bold cursor-pointer duration-300'>See more ...</span></p>
            </div>
            <div className='mt-5 flex flex-col'>

                <h4 className='text-2xl font-bold'>130 Comments</h4>
                
                <div className='flex flex-col gap-3 items-center justify-between mt-3'>
                   {
                    Array.from({length: 10}).map((_, index) => (
                         <div className='flex' key={index}>
                        <i className="ri-user-line flex items-center justify-center text-2xl bg-base-300 rounded-full w-12 h-12 text-center flex-shrink-0"></i>
                        <div className='flex flex-col ml-3'>
                            <h3 className='font-bold'>@Jack Nicholai <span className='text-sm text-base-content/60 font-normal ml-3'>1 day ago</span></h3>
                            <p className='flex flex-wrap'>Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis, labore? Lorem ipsum dolor sit amet.</p>
                            <div className="cmnt-action flex gap-5 items-center text-base-content/60 mt-2">
                                <span className='cursor-pointer flex items-center justify-center gap-1  duration-300 hover:text-base-content hover:font-bold'>
                                    <i className="ri-thumb-up-line"></i>
                                <span>24</span>
                                </span>

                                <span className='cursor-pointer hover:text-base-content hover:font-bold duration-300 '>
                                    <i class="ri-thumb-down-line"></i>
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
