import mongoose, {isValidObjectId} from "mongoose"
import {Playlist} from "../models/playlist.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"


const createPlaylist = asyncHandler(async (req, res) => {
    const {name, description} = req.body

    //TODO: create playlist

    if(!name && !description){
        throw new ApiError(400,"Playlist name and description are required")
    }

    const playlist = await Playlist.create({
        name,
        description,
        owner: req.user._id
    })

    if(!playlist){
        throw new ApiError(500, "Unable to create playlist")
    }

    return res
    .status(201)
    .json(
        new ApiResponse(201, playlist, "Playlist created successfully")
    )
})

const getUserPlaylists = asyncHandler(async (req, res) => {
    const {userId} = req.params
    //TODO: get user playlists

    if(!userId){
        throw new ApiError(400,"User id is required")
    }

    const playlists = await Playlist.find({owner: userId})

    if(!playlists){
        throw new ApiError(404, "No playlists found")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, playlists, "Plalists fetched sucessfully")
    )
})

const getPlaylistById = asyncHandler(async (req, res) => {
    const {playlistId} = req.params
    //TODO: get playlist by id
    if(!playlistId){
        throw new ApiError(400, "Playlist id is required")
    }

    const playlist = await Playlist.findById(playlistId)

    if(!playlist){
        throw new ApiError(404, "Playlist not found")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, playlist, "Plalist fetched successfully")
    )
})

const addVideoToPlaylist = asyncHandler(async (req, res) => {
    const {playlistId, videoId} = req.params

    if(!playlistId && ! videoId){
        throw new ApiError(400, "Playlist id and video id are required") 
    }

    const playlist = await Playlist.findById(playlistId)
    playlist.videos.push(videoId)
    await playlist.save()

    return res
    .status(200)
    .json(
        new ApiResponse(200, playlist, "Video added to playlist successfully")
    )
})

const removeVideoFromPlaylist = asyncHandler(async (req, res) => {
    const {playlistId, videoId} = req.params
    // TODO: remove video from playlist

    if(!playlistId && !videoId){
        throw new ApiError(400, "Playlist id and video id are required")
    }

    const playlist = await Playlist.findById(playlistId)
    if(!playlist){
        throw new ApiError(404, "Plalist not found")
    }

    const videoIndex = playlist.videos.indexOf(videoId)
    if(videoIndex === -1){
        throw new ApiError(404, "Video not found in the playlist")
    }
    playlist.videos.splice(videoIndex, 1)
    await playlist.save()

    return res
    .status(200)
    .json(
        new ApiResponse(200, playlist, "Video removed from playlist successfully")
    )

})

const deletePlaylist = asyncHandler(async (req, res) => {
    const {playlistId} = req.params
    // TODO: delete playlist

    if(!playlistId){
        throw new ApiError(400, "Playlist id is required")
    }

    const playlist = await Playlist.findByIdAndDelete(playlistId)

    if(!playlist){
        throw new ApiError(404, "Playlist not found ")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, playlist , "Playlist deleted successfully")
    )
})

const updatePlaylist = asyncHandler(async (req, res) => {
    const {playlistId} = req.params
    const {name, description} = req.body
    //TODO: update playlist
    
    if(!playlistId){
        throw new ApiError(400, "Playlist id is required")
    }

    if(!name || !description){
        throw new ApiError(400, "Playlist name and description are required")
    }

    const playlist = await Playlist.findByIdAndUpdate(
        playlistId,
        {
            name,
            description
        },
        {new: true}    
    )

    if(!playlist){
        throw new ApiError(404, "Playlist not found")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, playlist, "Playlist updated successfully")
    )
})

export {
    createPlaylist,
    getUserPlaylists,
    getPlaylistById,
    addVideoToPlaylist,
    removeVideoFromPlaylist,
    deletePlaylist,
    updatePlaylist
}