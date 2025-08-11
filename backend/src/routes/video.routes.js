import { Router } from 'express';
import {
    deleteVideo,
    getAllVideos,
    getVideoById,
    publishAVideo,
    getLikedVideos,
    updateVideo,
} from "../controllers/video.controller.js"
import {verifyJWT} from "../middlewares/auth.middleware.js"
import {upload} from "../middlewares/multer.middleware.js"

const router = Router();
router
    .route("/likeVideo")
    .get(verifyJWT,getLikedVideos)
router
    .route("/")
    .get(verifyJWT,getAllVideos)
    .post(verifyJWT,
        upload.fields([
            {
                name: "videoFile",
                maxCount: 1,
            },
            {
                name: "thumbnail",
                maxCount: 1,
            },
            
        ]),
        publishAVideo
    );

router
    .route("/:videoId")
    .get(verifyJWT,getVideoById)
    .delete(verifyJWT,deleteVideo)
    .patch(verifyJWT,upload.single("thumbnail"), updateVideo);




// router.route("/toggle/publish/:videoId").patch(togglePublishStatus);

export default router