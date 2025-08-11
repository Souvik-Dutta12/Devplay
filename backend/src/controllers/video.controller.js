import mongoose, { isValidObjectId } from "mongoose"
import { Video } from "../models/video.model.js"
import { User } from "../models/user.model.js"
import { ApiError } from "../utils/apiError.js"
import { ApiResponse } from "../utils/apiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import {Like} from "../models/like.model.js"

const getAllVideos = asyncHandler(async (req, res) => {
    const { query = "", sortBy = "createdAt", sortType = "desc", userId } = req.query;

    // Build filters
    const filters = {};
    if (query) {
        filters.title = { $regex: query, $options: "i" }; 
    }
    if (userId) {
        filters.owner = userId; 
    }

    // Sorting logic
    const sortOptions = {};
    sortOptions[sortBy] = sortType === "asc" ? 1 : -1;

    // Fetch videos
    const videos = await Video.find(filters).populate("owner","username channelName avatar").sort(sortOptions);

    // Count total for pagination, if needed
    const totalVideos = await Video.countDocuments(filters);

    res.status(200).json({
        success: true,
        data: videos,
        total: totalVideos,
    });
});


const publishAVideo = asyncHandler(async (req, res) => {
    const { title, description } = req.body;
    const userId = req.user._id;

    if (!userId) throw new ApiError(404, "User not found");
    if (!title || !description) {
        throw new ApiError(400, "Title and description are required");
    }

    const videoFileLocalPath = req.files?.videoFile?.[0]?.path;
    const thumbnailLocalPath = req.files?.thumbnail?.[0]?.path;

    if (!videoFileLocalPath || !thumbnailLocalPath) {
        throw new ApiError(400, "Video file and thumbnail are required");
    }
    
    const videoFile = await uploadOnCloudinary(videoFileLocalPath);
    const thumbnail = await uploadOnCloudinary(thumbnailLocalPath);
    console.log(videoFile,thumbnail);

    if (!videoFile || !thumbnail) {
        throw new ApiError(500, "Failed to upload video file or thumbnail");
    }

    const video = await Video.create({
        videoFile: videoFile.url,
        thumbnail: thumbnail.url,
        title,
        description,
        duration: videoFile.duration,
        owner: userId,
    });

    if (req.body.tags && Array.isArray(req.body.tags)) {
        video.tags = req.body.tags;
    } else if (req.body.tags && typeof req.body.tags === 'string') {
        // Handle tags sent as comma-separated string
        video.tags = req.body.tags.split(',').map(tag => tag.trim());
    }
    await video.save();

    const publishedVideo = await Video.findById(video._id).populate("owner","username channelName avatar subscribers");
    if (!publishedVideo) {
        throw new ApiError(500, "Something went wrong while publishing the video");
    }

    // ✅ Push video ID into user's videos array
    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError(404, "User not found when updating video list");
    }

    user.videos.push(video._id); // assumes user.videos is an array
    await user.save();

    return res.status(201).json(
        new ApiResponse(200, publishedVideo, "Video published successfully")
    );
});


const getVideoById = asyncHandler(async (req, res) => {
    const { videoId } = req.params

    const currentVideo = await Video.findById(videoId).populate("owner","username channelName avatar subscribers");

    if (!currentVideo) {
        throw new ApiError(404, "Video not found")
    }

    

    return res
        .status(200)
        .json(
            new ApiResponse(200, currentVideo, "Video found successfully")
        )
})

const updateVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    const { title, description } = req.body
    //TODO: update video details like title, description, thumbnail

    if (!mongoose.Types.ObjectId.isValid(videoId)) {
        throw new ApiError(400, "Invalid video id");
    }

    const video = await Video.findById(videoId);


    if (!video) {
        throw new ApiError(404, "Video not found");
    }


    const updateFields = {};
    if (title) updateFields.title = title;
    if (description) updateFields.description = description;
    if (req.file) updateFields.thumbnail = req.file.path;


    const updatedVideo = await Video.findByIdAndUpdate(
        videoId,
        {
            $set: updateFields
        },
        { new: true }
    );

    return res
        .status(200)
        .json(
            new ApiResponse(200, updatedVideo, "Video updated successfully")
        );
})


const deleteVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: delete video
    if (!videoId) {
        throw new ApiError(400, "Video id not matched");
    }

    const video = await Video.findOneAndDelete(videoId);

    if (!video) {
        throw new ApiError(404, "Video not found")
    }
    return res
        .status(200)
        .json(
            new ApiResponse(200, video, "Video deleted successfully")
        )
})

const getLikedVideos = asyncHandler(async (req, res) => {
  const userId = req.user._id;


  // Find all Like documents by this user, populate the video details including owner info
  const likes = await Like.find({ likedBy: userId })
    .populate({
      path: "video",
      populate: { path: "owner", select: "username channelName avatar" },
    })
    .sort({ createdAt: -1 });

  // Extract the video documents from the likes
  const likedVideos = likes.map(like => like.video).filter(Boolean);

  return res.status(200).json(
    new ApiResponse(200, likedVideos, "Liked videos fetched successfully")
  );
});


export {
    getAllVideos,
    publishAVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    getLikedVideos,
}