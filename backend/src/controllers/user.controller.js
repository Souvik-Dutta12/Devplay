import { asyncHandler } from "../utils/asyncHandler.js";

const registerUser = asyncHandler( async (req,res)=>{
    //get user details from frontend
    const { fullname,email,username,password } = req.body;
    //validation
    //check if user already exists
    //check for images, check for avatar
    //upload them to cloudinary, avatar
    //create user object - create entry in db
    //remove password and refresh token field from respone
    //check for user creation
    //return res

})


export { registerUser }