import React from 'react'

const Watch = () => {
  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Left: Video Section */}
      <div className="w-3/4 p-4">
        {/* Ad Video */}
        <div className="relative">
          <div className="aspect-video bg-gray-800 rounded-lg overflow-hidden">
            <img
              src="/thumbnail.png"
              alt="Ad"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 bg-white text-black px-3 py-1 rounded">
              TATA 1mg Labs <a href="https://1mg.com/labs" className="text-blue-600 ml-2">Book now</a>
            </div>
          </div>
        </div>

        {/* Main Video Title & Info */}
        <div className="mt-4">
          <h2 className="text-xl font-bold">Crash course on Next Auth or Authjs</h2>
          <div className="flex items-center justify-between mt-2 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <img
                src="https://yt3.ggpht.com/ytc/AKedOLQvnGNSDpKlbzz2kSR..."
                alt="Chai aur Code"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-semibold text-white">Chai aur Code</p>
                <p>696K subscribers</p>
              </div>
              <button className="ml-4 px-3 py-1 bg-white text-black rounded">Subscribe</button>
              <i className="ri-notification-2-fill xl"></i>
            </div>

            <div className="flex gap-4 items-center">
              <button className="flex items-center gap-1"><i className="ri-thumb-up-line"></i> 4.3K</button>
              <button><i className="ri-share-forward-line"></i></button>
              <button><i className="ri-thumb-down-line"></i></button>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Sidebar */}
      <div className="w-1/4 p-4 space-y-4">
        <div className="bg-white text-black text-center py-2 rounded">
          🎉 10 Years Strong - TATA 1mg
        </div>

        <div className="space-y-4">
          {/* Sidebar Video Card */}
          <div className="flex gap-3">
            <img src="/nextjs-video.jpg" className="w-24 h-16 rounded object-cover" />
            <div>
              <p className="text-sm font-bold">OTP verification and unique username check in Nextjs</p>
              <p className="text-xs text-gray-400">Chai aur Code • 27K views • 1y ago</p>
            </div>
          </div>

          <div className="flex gap-3">
            <img src="/chandaniya.jpg" className="w-24 h-16 rounded object-cover" />
            <div>
              <p className="text-sm font-bold">CHANDANIYA (Song) | Ashish Chanchlani</p>
              <p className="text-xs text-gray-400">T-Series • 6.3M views • 1 day ago</p>
            </div>
          </div>

          <div className="flex gap-3">
            <img src="/space-video.jpg" className="w-24 h-16 rounded object-cover" />
            <div>
              <p className="text-sm font-bold">পৃথিবীতে ফিরেছে শুভাঙ্কর মহাকাশযাত্রী...</p>
              <p className="text-xs text-gray-400">Travel Shooters • 47K views • 5 days ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Watch
