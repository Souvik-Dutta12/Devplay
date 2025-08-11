import mongoose, { isValidObjectId } from "mongoose"
import { Like } from "../models/like.model.js"
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js"
import { Video } from "../models/video.model.js";
import { Comment } from "../models/comment.model.js";

const toggleVideoLike = asyncHandler(async (req, res) => {
    const { videoId } = req.params;

    if (!videoId) throw new ApiError(400, "Video id is required");
    if (!isValidObjectId(videoId)) throw new ApiError(400, "Invalid video id");

    const video = await Video.findById(videoId);
    if (!video) throw new ApiError(404, "Video not found");

    // Find ALL likes by this user for this video (just in case duplicates exist)
    const existingLikes = await Like.find({
        video: videoId,
        likedBy: req.user._id,
    });

    if (existingLikes.length > 0) {
        // Remove all likes for this video by this user
        const likeIds = existingLikes.map(like => like._id);
        await Like.deleteMany({ _id: { $in: likeIds } });

        // Pull from video.likes array
        await Video.findByIdAndUpdate(videoId, {
            $pull: { likes: { $in: likeIds } }
        });

        return res.status(200).json(
            new ApiResponse(200, "Video like removed")
        );
    }

    // Create new like
    const newLike = await Like.create({
        video: videoId,
        likedBy: req.user._id,
    });

    // Push into video.likes array
    await Video.findByIdAndUpdate(videoId, {
        $push: { likes: newLike._id }
    });

    res.status(201).json(
        new ApiResponse(201, newLike, "Video liked")
    );
});

const toggleCommentLike = asyncHandler(async (req, res) => {
    const { commentId } = req.params;

    if (!commentId) {
        throw new ApiError(400, "Comment id is required");
    }

    if (!isValidObjectId(commentId)) {
        throw new ApiError(400, "Invalid comment id");
    }

    const comment = await Comment.findById(commentId);
    if (!comment) {
        throw new ApiError(404, "Comment not found");
    }

    // Check if the like already exists for this user & comment
    const existingLike = await Like.findOne({
        comment: commentId,
        likedBy: req.user._id,
    });

    if (existingLike) {
        // Remove Like document
        await existingLike.deleteOne();

        // Pull from comment.likes array
        await Comment.findByIdAndUpdate(commentId, {
            $pull: { likes: existingLike._id }
        });

        return res.status(200).json(
            new ApiResponse(200, "Comment like removed")
        );
    }

    // Create new Like document
    const newLike = await Like.create({
        comment: commentId,
        likedBy: req.user._id,
    });

    // Push Like ID into comment.likes array
    await Comment.findByIdAndUpdate(commentId, {
        $push: { likes: newLike._id }
    });

    res.status(201).json(
        new ApiResponse(201, newLike, "Comment liked")
    );
});


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
    toggleVideoLike,
    getLikedVideos
}