const express = require("express");
const multer = require("multer");
const videosController = require("../../controllers/admin/videosController");
const router = express.Router();
const storage = multer.diskStorage({
  destination: "./uploads",
});
const upload = multer({ storage });
router.post("/addLecture", upload.single("file"), videosController.createVideo);
router.get("/getAllLectures", videosController.getAllVideos);
router.get("/getLectures/:chapter_id", videosController.getVideoById);
router.put("/:videoId", videosController.updateVideoById);
router.delete("/deleteLecture/:videoId", videosController.deleteVideoById);

module.exports = router;
