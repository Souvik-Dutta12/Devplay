import {Router} from "express";
import { 
    getMyProfile,
  updateMyProfile,
  getUserByUsername,
  subscribeToUser,
  unsubscribeFromUser,
  addToWatchHistory
} from "../controllers/user.controller.js";
import {upload,uploadFields} from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// Protected routes
router.get("/me", verifyJWT, getMyProfile);
router.patch("/update", verifyJWT, uploadFields, updateMyProfile);
router.post("/history", verifyJWT, addToWatchHistory);
router.post("/subscribe/:username", verifyJWT, subscribeToUser);
router.post("/unsubscribe/:username", verifyJWT, unsubscribeFromUser);

// Public route
router.get("/:username", getUserByUsername);

export default router;