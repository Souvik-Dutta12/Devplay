import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { timeAgo, formatViews } from '../common/common';
import { Link } from 'react-router-dom';
import thumbnail from '/thumbnil.jpeg'

const PlayVideo = ({ setSidebarOpen }) => {

    const { videoId } = useParams();
    const { axios, token, user } = useAppContext();
    const [vidData, setVidData] = useState(null);
    const [vidComments, setVidComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [showFullDesc, setShowFullDesc] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [isCommentLike, setIsCommentLike] = useState(false);
    const [commentLikes, setCommentLikes] = useState({});
    const [disabledLikes, setDisabledLikes] = useState({});
    const [videoLikeDisabled, setVideoLikeDisabled] = useState(false);

    const userId = user?._id;

    const fetchVideo = async () => {
        if (!token) {
            toast.error("No token found. Please log in.");
            return;
        }

        try {
            const res = await axios.get(`/videos/${videoId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            const video = res.data.data;
            setVidData(video);

            // ✅ Set default like state for video
            setIsLiked(video.likes?.some(id => id === userId) || false);
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message || 'Failed to fetch data');
        }
    };

    const fetchComments = async () => {
        if (!token) {
            toast.error("No token found. Please log in.");
            return;
        }
        try {
            const res = await axios.get(`/comments/${videoId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            const comments = res.data.data;
            const likesMap = {};
            const disabledMap = {};

            comments.forEach(comment => {
                likesMap[comment._id] = comment.likes?.some(id => id === userId) || false;
                disabledMap[comment._id] = false; // initially enabled
            });

            setVidComments(comments);
            setCommentLikes(likesMap);
            setDisabledLikes(disabledMap);
        } catch (error) {
            toast.error('Failed to fetch comments');
        }
    }

    const handleComment = async () => {
        if (!token) {
            toast.error("Please log in to comment");
            return;
        }
        if (!newComment.trim()) {
            toast.error("Comment cannot be empty");
            return;
        }

        try {
            await axios.post(
                `/comments/${videoId}`,
                { content: newComment },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setNewComment("");
            fetchComments();
            toast.success("Comment posted successfully");
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to post comment");
        }
    };

    const handleCommentLike = (id) => {
        if (disabledLikes[id]) return; // already disabled, ignore
        setDisabledLikes(prev => ({ ...prev, [id]: true }));

        setCommentLikes(prev => ({
            ...prev,
            [id]: !prev[id]
        }));

        toggleCommentLike(id);
    };

    const toggleLike = async () => {
        setIsLiked(prev => !prev);
        setVideoLikeDisabled(true); // track video like disabled state
        try {
            await axios.post(`/likes/toggle/v/${videoId}`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchVideo();
        } catch (error) {
            setIsLiked(prev => !prev);
            toast.error(error?.response?.data?.message || "Failed to like video");
        } finally {
            setVideoLikeDisabled(false); // re-enable
        }
    };
    const toggleCommentLike = async (commentId) => {

        try {
            const { data } = await axios.post(
                `/likes/toggle/c/${commentId}`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );

            fetchComments();
        } catch (error) {

            toast.error(error?.response?.data?.message || "Failed to like video");
        }
    };

    const handleDownload = () => {
        if (!vidData?.videoFile) {
            toast.error("No video file found to download");
            return;
        }

        // Create a hidden anchor element
        const link = document.createElement("a");
        link.href = vidData.videoFile;
        link.download = vidData.title || "video"; // Suggested filename
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    useEffect(() => {
        if (!token) return;
        fetchVideo();
        setSidebarOpen(false);
    }, [videoId, token]);

    useEffect(() => {
        if (!token) return;
        fetchComments()
    }, [token])

    return (
        <div className='w-full px-3 md:px-0 md:pl-7  md:w-2/3'>
            <video
                className="w-full h-[200px] md:h-[450px] rounded-xl"
                controls
                src={vidData?.videoFile}
            />

            <h3 className='text-2xl font-bold mt-3'>{vidData?.title}</h3>
            <div className="flex items-center justify-between flex-wrap mt-1 text-sm text-base-content/60">
                <p>{formatViews(vidData?.views)} Views &bull; {timeAgo(vidData?.createdAt)}</p>

            </div>

            <div className='flex flex-col md:flex-row gap-5 md:gap-0 items-center justify-between mt-3'>
                <div className='flex'>
                    <img src={vidData?.owner?.avatar || thumbnail} className="ri-user-line flex items-center justify-center text-2xl bg-base-300 rounded-full w-12 h-12 text-center " />
                    <div className='flex  ml-3 justify-between gap-20'>
                        <div className='flex flex-col gap-0 '>
                            <Link to={`/users/user/${vidData?.owner?._id}`} className='font-bold text-lg'>{vidData?.owner?.channelName}</Link>
                            <span className='text-base-content/60 text-sm'>{formatViews(vidData?.owner?.subscribers?.length)} </span>
                        </div>
                        <button className='btn btn-primary rounded-full'>Subscribe</button>
                    </div>
                </div>
                <div className='flex items-center gap-3'>
                    <button
                        className='btn flex items-center justify-center rounded-full'
                        onClick={toggleLike}
                        disabled={videoLikeDisabled}
                    >
                        {isLiked ? <i className="ri-thumb-up-fill text-xl"></i> : <i className="ri-thumb-up-line text-xl"></i>}
                        {formatViews(vidData?.likes?.length || 0)}
                    </button>
                    <button className='btn flex items-center justify-center rounded-full'>
                        <i className="ri-thumb-down-line text-xl "></i>
                    </button>
                    <button className='btn flex items-center justify-center rounded-full'>
                        <i className="ri-share-forward-line text-xl "></i>Share
                    </button>
                    <button className='btn flex items-center justify-center rounded-full' onClick={handleDownload}>
                        <i className="ri-download-line text-xl "></i>Download
                    </button>
                </div>
            </div>
            <hr className='mt-3' />
            <div
                className={`mt-3 mx-auto px-5 py-2 bg-base-300 rounded-xl w-[700px] transition-all  overflow-y-auto
        ${showFullDesc ? 'h-auto' : 'h-auto overflow-hidden'} duration-300`}
            >
                <p className='break-words'>
                    {vidData?.description
                        ? showFullDesc
                            ? vidData?.description
                            : vidData?.description.slice(0, 150) + (vidData?.description.length > 150 ? "..." : "")
                        : "No description available."}

                    {vidData?.description?.length > 150 && (
                        <span
                            className='text-base-content/60 hover:underline hover:text-base-content hover:font-bold cursor-pointer duration-300 ml-1'
                            onClick={() => setShowFullDesc(!showFullDesc)}
                        >
                            {showFullDesc ? " See less" : " See more"}
                        </span>
                    )}
                </p>
            </div>

            <div className='mt-5 flex flex-col'>

                <h4 className='text-2xl font-bold'>{formatViews(vidComments.length)} Comments</h4>
                <div className='mt-3 w-full flex items-center justify-center gap-3'>
                    <img src={user?.avatar || thumbnail} alt="" className='w-12 h-12 rounded-full ' />
                    <div className='flex flex-col gap-1 w-full'>
                        <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            cols={1}
                            className="border-b p-3 border-base-content/60 hover:border-b-2 focus:border-base-content duration-300 w-full h-14 resize-none outline-none focus:ring-0"
                            placeholder='Drop your comment here...'
                        ></textarea>
                        <div className='flex justify-end'>
                            <button className='btn btn-primary btn-outline rounded-full duration-300' onClick={handleComment}>
                                Comment
                            </button>

                        </div>
                    </div>

                </div>
                <div className='flex flex-col gap-3  justify-between mt-3'>
                    {
                        vidComments.map((comment, index) => (
                            <div className='flex' key={comment._id}>
                                <img src={comment.owner?.avatar || '/default-avatar.png'} className="ri-user-line flex items-center justify-center text-2xl bg-base-300 rounded-full w-12 h-12 text-center flex-shrink-0" />
                                <div className='flex flex-col ml-3'>
                                    <h3 className='font-bold'>@{comment.owner?.username}<span className='text-sm text-base-content/60 font-normal ml-3'>{timeAgo(comment.createdAt)}</span></h3>
                                    <p className='flex flex-wrap'>{comment.content}</p>
                                    <div className="cmnt-action flex gap-5 items-center text-base-content/60 mt-2">
                                        <button
                                            onClick={() => handleCommentLike(comment._id)}
                                            disabled={disabledLikes[comment._id]}
                                            className="cursor-pointer flex items-center justify-center gap-1 duration-300 hover:text-base-content hover:font-bold"
                                        >
                                            {commentLikes[comment._id] ? <i className="ri-thumb-up-fill"></i> : <i className="ri-thumb-up-line"></i>}
                                            <span>{formatViews(comment.likes?.length || 0)}</span>
                                        </button>


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
