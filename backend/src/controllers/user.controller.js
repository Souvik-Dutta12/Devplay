import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";


const createUserIfNotExist = async (clerkId) => {
  const existingUser = await User.findOne({ clerkId });

  if (!existingUser) {
    const newUser = new User({ clerkId });
    await newUser.save();
    return newUser;
  }

  return existingUser;
};
// Get logged-in user's profile
const getMyProfile = asyncHandler(async (req, res) => {
  const user = await User.findOne({ clerkId: req.auth.userId });
  if (!user) throw new ApiError(404, "User not found");
  res.status(200).json(new ApiResponse(200, user));
});

// Update profile (username, avatar, coverImage)
const updateMyProfile = asyncHandler(async (req, res) => {
  const clerkId = req.auth.userId;
  const { username } = req.body;

  const user = await User.findOne({ clerkId });
  if (!user) throw new ApiError(404, "User not found");

  // Username logic
  if (username && username !== user.username) {
    const exists = await User.findOne({ username: username.toLowerCase() });
    if (exists) throw new ApiError(409, "Username already taken");
    user.username = username.toLowerCase();
  }

  // Avatar upload logic
  if (req.files?.avatar) {
    const result = await uploadOnCloudinary(req.files.avatar[0].path);
    if (result?.url) user.avatar = result.url;
  }

  // Cover image upload logic
  if (req.files?.coverImage) {
    const result = await uploadOnCloudinary(req.files.coverImage[0].path);
    if (result?.url) user.coverImage = result.url;
  }

  await user.save();
  res.status(200).json(new ApiResponse(200, user, "Profile updated successfully"));
});

// Get any user's public profile by username
const getUserByUsername = asyncHandler(async (req, res) => {
  const { username } = req.params;
  const user = await User.findOne({ username }).select("-watchHistory");
  if (!user) throw new ApiError(404, "User not found");
  res.status(200).json(new ApiResponse(200, user));
});

// Subscribe to another user
const subscribeToUser = asyncHandler(async (req, res) => {
  const currentUser = await User.findOne({ clerkId: req.auth.userId });
  const targetUser = await User.findOne({ username: req.params.username });
  if (!targetUser) throw new ApiError(404, "Target user not found");

  if (!targetUser.subscribers.includes(currentUser._id)) {
    targetUser.subscribers.push(currentUser._id);
    await targetUser.save();
  }

  res.status(200).json(new ApiResponse(200, null, "Subscribed successfully"));
});

// Unsubscribe
const unsubscribeFromUser = asyncHandler(async (req, res) => {
  const currentUser = await User.findOne({ clerkId: req.auth.userId });
  const targetUser = await User.findOne({ username: req.params.username });
  if (!targetUser) throw new ApiError(404, "Target user not found");

  targetUser.subscribers = targetUser.subscribers.filter(
    (id) => id.toString() !== currentUser._id.toString()
  );

  await targetUser.save();
  res.status(200).json(new ApiResponse(200, null, "Unsubscribed successfully"));
});

// Add video to watch history
const addToWatchHistory = asyncHandler(async (req, res) => {
  const user = await User.findOne({ clerkId: req.auth.userId });
  const { videoId } = req.body;

  if (!user.watchHistory.includes(videoId)) {
    user.watchHistory.push(videoId);
    await user.save();
  }

  res.status(200).json(new ApiResponse(200, user.watchHistory, "Added to watch history"));
});

export {
  getMyProfile,
  updateMyProfile,
  getUserByUsername,
  subscribeToUser,
  unsubscribeFromUser,
  addToWatchHistory
}