import { Router } from "express";
import {
    deleteVideo,
    getAVideobyId,
    getAllVideos,
    publishAVideo,
    togglePublishStatus,
    updateVideo,
    getAllSubscriptionVideos
} 
from "../controllers/video.controller.js"
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/publish-video").post(
    verifyJWT,
    publishAVideo
)
router.route("/delete-video/:videoId").delete(verifyJWT,deleteVideo);
router.route("/update-video-details/:videoId").post(verifyJWT ,updateVideo);
router.route("/get-video/:videoId").get(verifyJWT,getAVideobyId)
router.route("/toggle-publish-status/:videoId").post(verifyJWT,togglePublishStatus)
router.route("/get-all-subscription-videos").post(verifyJWT,getAllSubscriptionVideos)

//get all-videos special
router.route("/get-all-videos").get(getAllVideos)

export default router;