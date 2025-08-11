import React, { useEffect,useState } from 'react'
import { useAppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';

const Sidebar = ({sidebarOpen,category,setCategory}) => {
const [isMobile, setIsMobile] = useState(false);

const {filter,setFilter} = useAppContext();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024); 
    };
    handleResize();
    window.addEventListener("resize", handleResize);


    return () => window.removeEventListener("resize", handleResize);
    
  }, []);


  return (
    <div className={ `z-9 w-1/5 h-screen fixed top-0 bg-base-300 pl-[2%] pt-[80px] overflow-y-scroll duration-500 ${isMobile ? (sidebarOpen ? 'left-0 w-2/3 ' : '-left-full') : (sidebarOpen ? 'w-1/5' : 'small')}`}>
        <div className='links text-lg font-semibold'>
            <Link to={"/"} className={`flex items-center mb-3 w-full flex-wrap cursor-pointer gap-3 ${category === "" ? "active": ""}`} 
            onClick={() => {
                setCategory("")
                setFilter("")
                }}>
                <i className="ri-home-4-line"></i><p>Home</p>
            </Link>
            <Link to={"/"} className={`flex items-center mb-3 w-full flex-wrap cursor-pointer gap-3 ${category === "shorts" ? "active": ""}`}
             onClick={()=>{
                setCategory("shorts")
                setFilter("Shorts")
            }}>
                <i className="ri-movie-ai-line"></i><p>Shorts</p>
            </Link >
            <div className='flex items-center mb-3 w-full flex-wrap cursor-pointer gap-3'>
               <i className="ri-movie-line"></i><p>Subscriptions</p>
            </div>
            <hr className='bg-content w-60'/>
        </div>
        <div className='links text-lg font-semibold mt-2'>
            <div className='flex items-center mb-3 w-full flex-wrap cursor-pointer gap-3'>
                <i className="ri-history-line"></i><p>History</p>
            </div>
            <div className='flex items-center mb-3 w-full flex-wrap cursor-pointer gap-3'>
               <i className="ri-play-list-2-fill"></i><p>Playlists</p>
            </div>
            <div className='flex items-center mb-3 w-full flex-wrap cursor-pointer gap-3'>
               <i className="ri-time-line"></i><p>Watch later</p>
            </div>
            <Link to={"/likedVideo"} className='flex items-center mb-3 w-full flex-wrap cursor-pointer gap-3'>
               <i className="ri-thumb-up-line"></i><p>Liked videos</p>
            </Link>
            <hr className='bg-content w-60'/>
        </div>
        
        <div className='links text-lg font-semibold mt-2'>
            <p className='text-xl font-bold mb-3'>Explore</p>
            <Link to={"/"} className={`flex items-center mb-3 w-full flex-wrap cursor-pointer gap-3 ${category === "shopping" ? "active": ""}`} 
            onClick={()=>{
                setCategory("shopping")
                setFilter("Shopping")
                }}>
                <i className="ri-shopping-bag-line"></i><p>Shopping</p>
            </Link>
             <Link to={"/"} className={`flex items-center mb-3 w-full flex-wrap cursor-pointer gap-3 ${category === "music" ? "active": ""}`} 
             onClick={()=>{
                setCategory("music")
                setFilter("Music")
                }}>
                <i className="ri-music-2-line"></i><p>Music</p>
            </Link>
            <Link to={"/"} className={`flex items-center mb-3 w-full flex-wrap cursor-pointer gap-3 ${category === "movies" ? "active": ""}`} 
            onClick={()=>{
                setCategory("movies")
                setFilter("Movies")
                }}>
               <i className="ri-film-line"></i><p>Movies</p>
            </Link>
            <Link to={"/"} className={`flex items-center mb-3 w-full flex-wrap cursor-pointer gap-3 ${category === "live" ? "active": ""}`} 
            onClick={()=>{
                setCategory("live")
                setFilter("Live")
                }}>
                <i className="ri-live-line"></i><p>Live</p>
            </Link>
           
            <Link to={'/'} className={`flex items-center mb-3 w-full flex-wrap cursor-pointer gap-3 ${category === "gaming" ? "active": ""}`} 
            onClick={()=>{
                setCategory("gaming")
                setFilter("Gaming")
                }}>
                <i className="ri-gamepad-line"></i><p>Gaming</p>
            </Link>
            <Link to={"/"} className={`flex items-center mb-3 w-full flex-wrap cursor-pointer gap-3 ${category === "news" ? "active": ""}`} 
            onClick={()=>{
                setCategory("news")
                setFilter("News")
                }}>
               <i className="ri-news-line"></i><p>News</p>
            </Link>
            <Link to={"/"} className={`flex items-center mb-3 w-full flex-wrap cursor-pointer gap-3 ${category === "sports" ? "active": ""}`} 
            onClick={()=>{
                setCategory("sports")
                setFilter("Sports")
                }}>
                <i className="ri-trophy-line"></i><p>Sports</p>
            </Link>
            <Link to={"/"} className={`flex items-center mb-3 w-full flex-wrap cursor-pointer gap-3 ${category === "courses" ? "active": ""}`} 
            onClick={()=>{
                setCategory("courses")
                setFilter("Courses")
                }}>
                <i className="ri-graduation-cap-line"></i><p>Courses</p>
            </Link>
            <Link to={"/"} className={`flex items-center mb-3 w-full flex-wrap cursor-pointer gap-3 ${category === "fashion" ? "active": ""}`} 
            onClick={()=>{
                setCategory("fashion")
                setFilter("Fashion")
                }}>
                <i className="ri-shirt-line"></i><p>Fashion & Beauty</p>
            </Link>
            <Link to={"/"} className={`flex items-center mb-3 w-full flex-wrap cursor-pointer gap-3 ${category === "podcasts" ? "active": ""}`} 
            onClick={()=>{
                setCategory("podcasts")
                setFilter("Podcasts")
                }}>
                <i className="ri-signal-tower-line"></i><p>Podcasts</p>
            </Link>
            
            
            
            <hr className='bg-content w-60'/>
        </div>
        <div className='flex flex-col my-2 gap-2'>
            <p className='text-2xl mb-2 font-bold'>Subscribed</p>
            <div className='text-lg flex items-center  gap-2 font-semibold  cursor-pointer'>
                <i className="ri-user-line px-3 py-2 bg-base-100 rounded-full"></i><p>Souvik Dutta</p>
            </div>
            <div className='text-lg flex items-center gap-2 font-semibold cursor-pointer'>
                <i className="ri-user-line px-3 py-2 bg-base-100 rounded-full"></i><p>Souvik Dutta</p>
            </div>
            <div className='text-lg flex items-center gap-2 font-semibold cursor-pointer'>
                <i className="ri-user-line px-3 py-2 bg-base-100 rounded-full"></i><p>Souvik Dutta</p>
            </div>
            <div className='text-lg flex items-center gap-2 font-semibold cursor-pointer'>
                <i className="ri-user-line px-3 py-2 bg-base-100 rounded-full"></i><p>Souvik Dutta</p>
            </div>
            <div className='text-lg flex items-center gap-2 font-semibold cursor-pointer'>
                <i className="ri-user-line px-3 py-2 bg-base-100 rounded-full"></i><p>Souvik Dutta</p>
            </div>
        </div>
    </div>
  )
}

export default Sidebar
