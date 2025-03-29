import mongoose, {isValidObjectId} from "mongoose"
import {Like} from "../models/like.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const toggleVideoLike = asyncHandler(async (req, res) => {
    const {videoId} = req.params;

    if (!videoId) {
        throw new ApiError(400, "Video id is required");
    }

    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid video id");
    }

    const existingLike = await Like.findOne({
        video: videoId,
        user: req.user._id,
    });

    if (existingLike) {
        await existingLike.deleteOne();
        return res
        .status(200)
        .json(
            new ApiResponse(200, "Video like removed")
        );
    }

    const newLike = await Like.create({
        video: videoId,
        user: req.user._id,
    });

    res
    .status(201)
    .json(
        new ApiResponse(201,newLike, "Video liked")
    );
});

const toggleCommentLike = asyncHandler(async (req, res) => {
    const {commentId} = req.params;

    if (!commentId) {
        throw new ApiError(400, "Comment id is required");
    }

    if (!isValidObjectId(commentId)) {
        throw new ApiError(400, "Invalid comment id");
    }

    const existingLike = await Like.findOne({
        comment: commentId,
        user: req.user._id,
    });

    if (existingLike) {
        await existingLike.deleteOne();
        return res
        .status(200)
        .json(
            new ApiResponse(200, "Comment like removed")
        );
    }

    const newLike = await Like.create({
        comment: commentId,
        user: req.user._id,
    });

    res
    .status(201)
    .json(
        new ApiResponse(201, newLike, "Comment liked")
    );
});

const toggleTweetLike = asyncHandler(async (req, res) => {
    const {tweetId} = req.params
    //TODO: toggle like on tweet
    if(!tweetId){
        throw new ApiError(400, "Tweet id is required")
    }

    if(!isValidObjectId(tweetId)){
        throw new ApiError(400, "Invalid tweet id")
    }

    const existingLike = await Like.findOne({
        tweet: tweetId,
        user: req.user._id
    })

    if(existingLike){
        await existingLike.deleteOne()
        return res
        .status(200)
        .json(
            new ApiResponse(200, "Tweet like removed")
        )
    }

    const newLike = await Like.create({
        tweet: tweetId,
        user: req.user._id
    })

    return res
    .status(201)
    .json(
        new ApiResponse(201, newLike, "Tweet liked")
    )
})

const getLikedVideos = asyncHandler(async (req, res) => {
    const likedVideos = await Like.find({ user: req.user._id, video: { $exists: true } })
        .populate('video')
        .exec();

    if (!likedVideos || likedVideos.length === 0) {
        return res
            .status(404)
            .json(new ApiResponse(404, "No liked videos found"));
    }

    res
        .status(200)
        .json(new ApiResponse(200, likedVideos, "Liked videos retrieved successfully"));
});

export {
    toggleCommentLike,
    toggleTweetLike,
    toggleVideoLike,
    getLikedVideos
}