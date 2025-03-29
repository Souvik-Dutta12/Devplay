import mongoose, {isValidObjectId} from "mongoose"
import {User} from "../models/user.model.js"
import { Subscription } from "../models/subscription.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"


const toggleSubscription = asyncHandler(async (req, res) => {
    const {channelId} = req.params
    // TODO: toggle subscription
    const {userId} = req.user;
    const user = await User.findById(userId);

    if(!user){
        throw new ApiError(404, "User not found")
    }

    const channel = await User.findById(channelId);

    if(!channel){
        throw new ApiError(404, "Channel not found")
    }

    const isSubscribed = user.subscriptions.includes(channelId);

    if (isSubscribed) {
        // Unsubscribe the user
        user.subscriptions = user.subscriptions.filter(id => id.toString() !== channelId);
        channel.subscribers -= 1;
    } else {
        // Subscribe the user
        user.subscriptions.push(channelId);
        channel.subscribers += 1;
    }

    await user.save();
    await channel.save();
    return res
    .status(200)
    .json(
        new ApiResponse(200, "Subscription toggled succcessfully",{
            isSubscribed: !isSubscribed,
            subscribers: channel.subscribers,
            subscriptions: user.subscriptions
        })
    )
    
})

// controller to return subscriber list of a channel
const getUserChannelSubscribers = asyncHandler(async (req, res) => {
    const {channelId} = req.params
    if(!channelId){
        throw new ApiError(400, "Channel id is required")
    }

    const subscribers = await Subscription.findById(channelId).populate("subscriberId", "name profilepic email");
    if(!subscribers){
        throw new ApiError(404, "No subscribers found")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, subscribers,"Subscribers fetched successfully")
    )
})

// controller to return channel list to which user has subscribed
const getSubscribedChannels = asyncHandler(async (req, res) => {
    const { subscriberId } = req.params
    if(!subscriberId){
        throw new ApiError(400, "Subscriber id is required")
    }

    const users = await User.findById(subscriberId).populate("subscriptions", "name profilepic email subscribers")
    if(!users){
        throw new ApiError(404, "No channels found")
    }
    return res
    .status(200)
    .json(
        new ApiResponse(200, users, "Subscribed channels fetched successfully")
    )
})

export {
    toggleSubscription,
    getUserChannelSubscribers,
    getSubscribedChannels
}