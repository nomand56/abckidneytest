const express = require("express");
const chapter = require("../models/chapter");
const Video = require("../models/addVideos");
const Quiz = require("../models/addQuiz");
const router = express.Router();

router.get("/openAccess", async (req, res) => {
  try {
    const chapters = await chapter.find();

    if (!chapters || chapters.length === 0) {
      return res.status(404).json({ error: "Chapters not found" });
    }

    const chapterIds = chapters.map((chapter) => chapter._id);

    const videos = await Video.find({ chapter_id: { $in: chapterIds } });
    const quiz = await Quiz.find({ chapter_id: { $in: chapterIds } });
    console.log(chapters, videos, quiz);
    res.status(200).json({ chapters, videos, quiz });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
