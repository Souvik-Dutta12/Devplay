import React from 'react'
import VideoCard from '../components/VideoCard';

const Subscription = () => {
    const videos = [
        {
            thumbnail: "https://i.ytimg.com/vi/aqz-KE-bpKQ/maxresdefault.jpg",
            title: "How to crack system design interviews",
            channel: "PrepBot AI",
            views: "54K",
            time: "2 days",
        },
        {
            thumbnail: "https://i.ytimg.com/vi/2Vv-BfVoq4g/maxresdefault.jpg",
            title: "Top 5 JS concepts for developers",
            channel: "DevPlay",
            views: "12K",
            time: "1 week",
        },
        {
            thumbnail: "https://i.ytimg.com/vi/aqz-KE-bpKQ/maxresdefault.jpg",
            title: "How to crack system design interviews",
            channel: "PrepBot AI",
            views: "54K",
            time: "2 days",
        },
        {
            thumbnail: "https://i.ytimg.com/vi/2Vv-BfVoq4g/maxresdefault.jpg",
            title: "Top 5 JS concepts for developers",
            channel: "DevPlay",
            views: "12K",
            time: "1 week",
        },
        {
            thumbnail: "https://i.ytimg.com/vi/aqz-KE-bpKQ/maxresdefault.jpg",
            title: "How to crack system design interviews",
            channel: "PrepBot AI",
            views: "54K",
            time: "2 days",
        },
        {
            thumbnail: "https://i.ytimg.com/vi/2Vv-BfVoq4g/maxresdefault.jpg",
            title: "Top 5 JS concepts for developers",
            channel: "DevPlay",
            views: "12K",
            time: "1 week",
        },
        {
            thumbnail: "https://i.ytimg.com/vi/aqz-KE-bpKQ/maxresdefault.jpg",
            title: "How to crack system design interviews",
            channel: "PrepBot AI",
            views: "54K",
            time: "2 days",
        },
        {
            thumbnail: "https://i.ytimg.com/vi/2Vv-BfVoq4g/maxresdefault.jpg",
            title: "Top 5 JS concepts for developers",
            channel: "DevPlay",
            views: "12K",
            time: "1 week",
        },
        {
            thumbnail: "https://i.ytimg.com/vi/aqz-KE-bpKQ/maxresdefault.jpg",
            title: "How to crack system design interviews",
            channel: "PrepBot AI",
            views: "54K",
            time: "2 days",
        },
        {
            thumbnail: "https://i.ytimg.com/vi/2Vv-BfVoq4g/maxresdefault.jpg",
            title: "Top 5 JS concepts for developers",
            channel: "DevPlay",
            views: "12K",
            time: "1 week",
        },
        {
            thumbnail: "https://i.ytimg.com/vi/aqz-KE-bpKQ/maxresdefault.jpg",
            title: "How to crack system design interviews",
            channel: "PrepBot AI",
            views: "54K",
            time: "2 days",
        },
        {
            thumbnail: "https://i.ytimg.com/vi/2Vv-BfVoq4g/maxresdefault.jpg",
            title: "Top 5 JS concepts for developers",
            channel: "DevPlay",
            views: "12K",
            time: "1 week",
        },
        {
            thumbnail: "https://i.ytimg.com/vi/aqz-KE-bpKQ/maxresdefault.jpg",
            title: "How to crack system design interviews",
            channel: "PrepBot AI",
            views: "54K",
            time: "2 days",
        },
        {
            thumbnail: "https://i.ytimg.com/vi/2Vv-BfVoq4g/maxresdefault.jpg",
            title: "Top 5 JS concepts for developers",
            channel: "DevPlay",
            views: "12K",
            time: "1 week",
        },
        {
            thumbnail: "https://i.ytimg.com/vi/aqz-KE-bpKQ/maxresdefault.jpg",
            title: "How to crack system design interviews",
            channel: "PrepBot AI",
            views: "54K",
            time: "2 days",
        },
        {
            thumbnail: "https://i.ytimg.com/vi/2Vv-BfVoq4g/maxresdefault.jpg",
            title: "Top 5 JS concepts for developers",
            channel: "DevPlay",
            views: "12K",
            time: "1 week",
        },
        {
            thumbnail: "https://i.ytimg.com/vi/aqz-KE-bpKQ/maxresdefault.jpg",
            title: "How to crack system design interviews",
            channel: "PrepBot AI",
            views: "54K",
            time: "2 days",
        },
        {
            thumbnail: "https://i.ytimg.com/vi/2Vv-BfVoq4g/maxresdefault.jpg",
            title: "Top 5 JS concepts for developers",
            channel: "DevPlay",
            views: "12K",
            time: "1 week",
        },

    ];
    return (
        <div className='w-full h-auto flex flex-col'>
            <h1 className='px-4 py-1 text-4xl font-bold'>Latest</h1>
            <div
                className="tags flex items-center gap-2 overflow-x-auto whitespace-nowrap px-4 py-2"
                style={{
                    scrollbarWidth: "none",       // Firefox
                    msOverflowStyle: "none",      // IE
                    touchAction: "pan-x",         // Prevents vertical scrolling while dragging horizontally
                }}
                onWheel={(e) => {
                    // Allow only horizontal scroll on mouse wheel
                    if (e.deltaY !== 0) {
                        e.preventDefault(); // Prevent vertical scroll
                        e.currentTarget.scrollLeft += e.deltaY;
                    }
                }}
            >
                {[...Array(25)].map((_, i) => (
                    <button
                        key={i}
                        className="cursor-pointer badge badge-outline badge-primary shrink-0"
                    >
                        Sheriyaan coding school
                    </button>
                ))}
            </div>


            <div className="vids w-full min-h-screen mt-3">

                <div className='grid grid-cols-1 md:grid-cols-3 gap-5 p-3  '>

                    {videos.map((video, indx) => (
                        <div key={indx} className=" rounded-md p-2 flex items-center justify-center">
                            <VideoCard {...video} />
                        </div>
                    ))}
                </div>


            </div>



        </div>
    )
}

export default Subscription
