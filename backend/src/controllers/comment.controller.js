import mongoose from "mongoose"
import {Comment} from "../models/comment.model.js"
import { ApiError } from "../utils/apiError.js"
import { ApiResponse } from "../utils/apiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const getVideoComments = asyncHandler(async (req, res) => {
    //TODO: get all comments for a video
    const {videoId} = req.params
    const {page = 1, limit = 10} = req.query
    if(!videoId){
        throw new ApiError(400, "VideoId is required")
    }

    const comments = await Comment.find({ video: videoId })
    .skip((page - 1) * limit)
    .limit(parseInt(limit))
    .sort({ createdAt: -1 })
    .populate("owner", "username avatar");

    if(!comments){
        throw new ApiError(404, "No comments found")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, comments, "Comments fetched successfully")
    )
})

const addComment = asyncHandler(async (req, res) => {
    // TODO: add a comment to a video
    const {videoId} = req.params
    const {content} = req.body

    if(!videoId){
        throw new ApiError(400, "Please provide a videoId")
    }
    if(!content){
        throw new ApiError(400, "Please provide a content")
    }

    const video = await mongoose.model("Video").findById(videoId)
    if(!video){
        throw new ApiError(404,"Video not found")
    }
    const comment = await Comment.create({
        content,
        video: videoId,
        owner: req.user._id
    })

    video.comments.push(comment._id);
    await video.save();

    if(!comment){
        throw new ApiError(500, "Could not create comment")
    }
    
    const populatedComment = await comment.populate("owner", "username avatar")

    return res
    .status(201)
    .json(
        new ApiResponse(201, populatedComment, "Comment created successully")
    )
})

const updateComment = asyncHandler(async (req, res) => {
    // TODO: update a comment
    const {commentId} = req.params
    const {content} = req.body

    if(!commentId){
        throw new ApiError(400, "CommentId is required")
    }
    if(!content){
        throw new ApiError(400, "Content is required")
    }

    const comment = await Comment.findByIdAndUpdate(

        commentId,
        {content},
        {new: true}
    )
    if(!comment){
        throw new ApiError(404, "Comment not found")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, comment, "Comment updated successfully")
    )
})

const deleteComment = asyncHandler(async (req, res) => {
    // TODO: delete a comment

    const {commentId} = req.params
    if(!commentId){
        throw new ApiError(400, "CommentId is required")
    }

    const comment = await Comment.findByIdAndDelete(commentId)

    if(!comment){
        throw new ApiError(404, "Comment not found")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, comment, "Comment deleted successfully")
    )
})

export {
    getVideoComments, 
    addComment, 
    updateComment,
    deleteComment
    }