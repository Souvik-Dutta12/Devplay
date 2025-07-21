import mongoose, {isValidObjectId} from "mongoose"
import {Video} from "../models/video.model.js"
import {User} from "../models/user.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"


const getAllVideos = asyncHandler(async (req, res) => {
    const { query, sortBy = "createdAt", sortType = "desc",clerkId } = req.query
    //TODO: get all videos based on query, sort, pagination
    const filters = {};
        if (query) {
            filters.title = { $regex: query, $options: "i" }; // Case-insensitive search by title
        }
        if (clerkId) {
            filters.userId = clerkId; // Filter by user ID if provided
        }

        const sortOptions = {};
        sortOptions[sortBy] = sortType === "asc" ? 1 : -1;

        const videos = await Video.find(filters)
            .sort(sortOptions)

        const totalVideos = await Video.countDocuments(filters);

        res.status(200).json({
            success: true,
            data: videos,     
        });
})

const publishAVideo = asyncHandler(async (req, res) => {
    const { title, description} = req.body
    // TODO: get video, upload to cloudinary, create video

    if(!title || !description){
        throw new ApiError(400, "Tittle and description are required");
    }

    const videoFileLocalPath = req.files?.videoFile[0]?.path
    const thumbnailLocalPath = req.files?.thumbnail[0]?.path

    if(!videoFileLocalPath && !thumbnailLocalPath){
        throw new ApiError(400, "Video file and thumbnail are reequired");
    }

    const videoFile = await uploadOnCloudinary(videoFileLocalPath)
    const thumbnail = await uploadOnCloudinary(thumbnailLocalPath)

    if(!videoFile && !thumbnail){
        throw new ApiError(500, "Failed to upload video file and thumbnail");
    }

    const video = await Video.create({
        videoFile : videoFile.url,
        thumbnail : thumbnail.url,
        title,
        description,
        duration : videoFile.duration,
        owner : req.user._id
    })

    const publishedVideo = await Video.findById(video._id)

    if(!publishedVideo){
        throw new ApiError(500, "Something went wrong while publishing the video");
    }

    return res
    .status(201)
    .json(
        new ApiResponse(200,publishedVideo,"Video published successfully")
    )

})

const getVideoById = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: get video by id

    const currentVideo = await Video.findById(videoId)

    if(!currentVideo){
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
    const {title, description} = req.body
    //TODO: update video details like title, description, thumbnail

    if (!mongoose.Types.ObjectId.isValid(videoId)) {
        throw new ApiError(400, "Invalid video id");
    }

    const video = await Video.findById(videoId);


    if(!video){
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
    if(!videoId){
        throw new ApiError(400, "Video id not matched");
    }

    const video = await Video.findOneAndDelete(videoId);

    if(!video){
        throw new ApiError(404, "Video not found")
    }
    return res
    .status(200)
    .json(
        new ApiResponse(200, video, "Video deleted successfully")
    )
})

const togglePublishStatus = asyncHandler(async (req, res) => {
    const { videoId } = req.params

    if(!videoId){
        throw new ApiError(400, "Video id not matched");
    }

    const video = await Video.findById(videoId);

    if(!video){
        throw new ApiError(404, "Video not found");
    }

    video.isPublished = !video.isPublished;

    return res
    .status(200)
    .json(
        new ApiResponse(200, video, "Video publish status updated successfully")
    )
})

export {
    getAllVideos,
    publishAVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus
}