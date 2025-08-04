import { User } from '../models/user.model.js';
import { Video } from '../models/video.model.js'
import { ApiError } from '../utils/apiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/apiResponse.js';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { uploadOncloudinary } from '../utils/cloudinary.js';

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken }

  } catch (error) {
    throw new ApiError(500, "Something went wrong while generating refresh and access token");
  }
}

const signUpUser = asyncHandler(async (req, res) => {
  const { password, username, description, channelName } = req.body;

  if (!password || !username || !description || !channelName) {
    throw new ApiError(400, "All fields are required");
  }

  // Check if username or channelName already exists
  const existedUser = await User.findOne({
    $or: [{ channelName }, { username }]
  });

  if (existedUser) {
    throw new ApiError(409, "User already exists");
  }

  let avatarUrl = ""; // default empty

  // If avatar file is uploaded
  if (req.file) {
    try {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "avatars",
        width: 150,
        crop: "scale"
      });
      avatarUrl = result.secure_url;
    } catch (error) {
      console.error("Avatar upload failed:", error);
      throw new ApiError(500, "Avatar upload failed");
    }
  }

  // Create user with optional avatar
  const user = await User.create({
    username: username.toLowerCase(),
    channelName,
    password,
    description,
    avatar: avatarUrl // will be empty string if not uploaded
  });

  const createdUser = await User.findById(user._id).select("-password -refreshToken");

  if (!createdUser) {
    throw new ApiError(500, "Failed to create user");
  }

  return res.status(201).json(
    new ApiResponse(200, createdUser, "User registered successfully")
  );
});


const loginUser = asyncHandler(async (req, res) => {

  // find user by email
  const { username, password } = req.body;

  if (!username || !password) {
    throw new ApiError(400, "All fields are required");
  }

  const user = await User.findOne({ username });

  if (!user) {
    throw new ApiError(404, "User not found");
  }
  // compare password
  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials");
  }
  // access and refresh token(s)

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);

  const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

  //cookie
  const options = {
    httpOnly: true,
    secure: true
  }

  return res.status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken
        }
        , "User loggedin Successfully")
    )

})

const logoutUser = asyncHandler(async (req, res) => {

  // remove refresh token
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1
      }
    },
    {
      new: true
    }

  )


  const options = {
    httpOnly: true,
    secure: true
  }

  return res.status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out successfully"))

})

const refreshAccessToken = asyncHandler(async (req, res) => {

  const inComingRrefreshToken = req.cookies.refreshToken || req.body.refreshToken;
  if (!inComingRrefreshToken) {
    throw new ApiError(401, "Unauthorised request")
  }

  try {
    const decodedToken = jwt.verify(inComingRrefreshToken, process.env.REFRESH_TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id)
    if (!user) {
      throw new ApiError(401, "Unauthorised request")
    }

    if (inComingRrefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "Refresh Token is expired or used")
    }

    const options = {
      httpOnly: true,
      secure: true
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id)


    return res.status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken },
          "Access token refreshed"
        )
      )
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh Token")
  }

})

const updateAvatar = asyncHandler(async (req, res) => {
  const avatarLocalPath = req.file?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Profile image is required.");
  }

  const uploadedImage = await uploadOncloudinary(avatarLocalPath);

  if (!uploadedImage.url) {
    throw new ApiError(500, "Error while uploading profile image.");
  }

  await User.findByIdAndUpdate(
    req.user._id,
    { $set: { avatar: uploadedImage.url } },
    { new: true }
  );

  return res.status(200).json(
    new ApiResponse(200, null, "Profile image updated successfully")
  );
});

const updateCoverImage = asyncHandler(async (req,res) => {
  const coverImageLocalPath = req.file?.path;
  if (!coverImageLocalPath) {
    throw new ApiError(400, "Cover image is required.");
  }
  const uploadedImage = await uploadOncloudinary(coverImageLocalPath);
  if (!uploadedImage.url) {
    throw new ApiError(500, "Error while uploading cover image.");
  } 
  await User.findByIdAndUpdate(
    req.user._id,
    { $set: { coverImage: uploadedImage.url } },
    { new: true }
    );

    return res.status(200).json(
      new ApiResponse(200, null, "Cover image updated successfully")
    );
})

const getUserById = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const currentUser = await User.findById(userId).select("-password -refreshToken");

  if (!currentUser) {
    throw new ApiError(404, "User not found")
  }

  return res.status(200)
    .json(new ApiResponse(200, currentUser, "User found successfully"))

})


const getVideosByUser = asyncHandler(async (req, res) => {
  const userID = req.user?._id;

  if (!userID) {
    throw new ApiError(404, "User not found");
  }

  if (!mongoose.Types.ObjectId.isValid(userID)) {
    throw new ApiError(400, "Invalid user ID");
  }

  const userWithVideos = await User.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(userID),
      },
    },
    {
      $lookup: {
        from: "videos",
        localField: "videos",
        foreignField: "_id",
        as: "videos",
        pipeline: [
          {
            $sort: {
              updatedAt: -1,

            }
          },
          {
            $project: {
              title: 1,
              description: 1,
              videoFile: 1,
              thumbnail: 1,
              tags: 1,
              duration: 1,
              views: 1,
              createdAt: 1,
              updatedAt: 1
            },
          },
        ],
      },
    },
  ]);

  if (!userWithVideos || userWithVideos.length === 0) {
    throw new ApiError(404, "User not found");
  }

  const user = userWithVideos[0];

  if (!user.videos || user.videos.length === 0) {
    return res.status(200).json(
      new ApiResponse(200, [], "User has no blogs yet")
    );
  }

  return res.status(200).json(
    new ApiResponse(200, user.videos, "Successfully fetched all blogs")
  );
});



export {
  signUpUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  updateAvatar,
  updateCoverImage,
  getUserById,
  getVideosByUser
}