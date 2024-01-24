const express = require("express");
const router = express.Router();
const chapterController = require("../../controllers/admin/chapterController");
const auth = require("../../utils/auth");

router.post("/addChapter", auth, chapterController.createChapter);
router.get("/getAllChapters", auth, chapterController.getAllChapters);
router.get("/chapters/:id", auth, chapterController.getChaptersById);
router.put("/updateChapter/:id", auth, chapterController.updateChapter);
router.delete("/chapter/:id", auth, chapterController.deleteChapter);

module.exports = router;

