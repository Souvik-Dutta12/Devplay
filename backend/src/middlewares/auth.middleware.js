import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async (req, _, next) => {
    try {
        const { userId } = getAuth(req);

        if (!userId) {
            throw new ApiError(401, "Unauthorized request: Clerk user not found");
        }

        let user = await User.findOne({ clerkId: userId });

        // First time login → create new MongoDB user
        if (!user) {
            const clerkUser = await clerkClient.users.getUser(userId);

            user = await User.create({
                clerkId: userId,
                email: clerkUser.emailAddresses[0]?.emailAddress || "",
                avatar: clerkUser.imageUrl,
                username: clerkUser.username || clerkUser.firstName || "",
            });
        }

        req.user = user;
        next();
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token")
    }

})