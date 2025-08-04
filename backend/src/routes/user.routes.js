import { Router } from "express";
import {
  signUpUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  updateAvatar,
  updateCoverImage,
  getUserById,
  getVideosByUser
} from "../controllers/user.controller.js";
import { upload, uploadFields } from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/signup").post(signUpUser)
router.route("/login").post(loginUser)


// Protected routes
router.route("/user/logout").post(verifyJWT, logoutUser)
router.route("/user/refresh-token").post(refreshAccessToken)
router.route("/user/avatar").patch(verifyJWT,upload.single("avatar"),updateAvatar)
router.route("/user/coverImage").patch(verifyJWT,upload.single("coverImage"),updateCoverImage)
router.route("/user/:userId").get(verifyJWT, getUserById)


router.route("/user/:userId/videos").get(verifyJWT, getVideosByUser);

export default router;