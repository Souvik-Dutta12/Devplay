import React, { useEffect, useRef, useState } from 'react'
import logo from "/devplayLogo.png"
import { Link } from 'react-router-dom'
import { useAppContext } from '../context/AppContext';
import { toast } from 'react-toastify';


const Navbar = ({ setSidebarOpen }) => {

    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    const { user, navigate, setUser, setToken,axios } = useAppContext();

    const userId = user?._id;
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);


    const handleLogout = async () => {
        console.log("clicked")
        try {
            const res = await axios.post("/users/user/logout");
            console.log(res)
            if (res.data.success) {
                toast.success("Logged out successfully");
                setUser(null);

                setToken(null);
                localStorage.clear();
                sessionStorage.clear();
                delete axios.defaults.headers.common["Authorization"];

                navigate("/login");
            } else {
                toast.error(res.data.message || "Logout failed");
            }
        } catch (error) {
            toast.error("Something went wrong while logging out");

        }
    };

    return (
        user && (
            <div className='flex w-[100vw] items-center px-5 py-3 shadow-xl justify-between bg-base-300 sticky top-0 z-10'>
                <div className='left flex items-center'>
                    <i onClick={() => setSidebarOpen(prev => !prev)} className="ri-menu-2-line text-xl font-bold mr-[25px] ml-[20px] cursor-pointer"></i>
                    <Link to="/" className='flex items-center text-xl ml-0 md:ml-5 cursor-pointer'>
                        <img className='w-10' src={logo} alt='logo' />
                        <p className='font-bold'> Devplay</p>
                    </Link>
                </div>

                <div className=' flex items-center'>
                    <div className=' items-center border rounded-full w-[550px] py-2 hidden md:flex'>

                        <input className='w-full outline-none bg-transparent px-4' type="text" placeholder='Search' />
                        <i className="ri-search-eye-line text-xl mr-5 cursor-pointer "></i>
                    </div>
                </div>

                <div className='right flex items-center text-xl mr-0 md:mr-5 gap-8'>
                    <Link to={'/upload'}>
                        <div className='flex items-center gap-4  bg-base-100 px-3 py-2 rounded-full cursor-pointer '>
                            <i className="ri-add-fill "></i>
                            <h1 className='text-lg'>Create</h1>
                        </div>
                    </Link>
                    <i className="ri-apps-2-fill cursor-pointer hidden md:flex"></i>
                    <i className="ri-notification-4-line cursor-pointer hidden md:flex"></i>
                    <div className="relative" ref={menuRef}>
                        {/* Trigger Icon */}
                        <i
                            onClick={() => setIsOpen((prev) => !prev)}
                            className="ri-user-line cursor-pointer rounded-full bg-base-100 px-3 py-2 text-xl"
                        ></i>

                        {/* Dropdown */}
                        {isOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-base-300 border border-none rounded-lg shadow-lg z-50">
                                <ul className="py-2 text-sm text-content">
                                    <li>
                                        <Link to={`/users/user/${userId}`} className="block px-4 py-2 hover:bg-base-100 cursor-pointer">
                                            Profile
                                        </Link>
                                    </li>

                                    <li>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full text-left px-4 py-2 hover:bg-base-100 flex gap-3 cursor-pointer"
                                        >
                                            Logout<i className="ri-logout-box-r-line"></i>
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    )
}

export default Navbar
