const Quiz = require("../../models/addQuiz");
const Video = require("../../models/addVideos");
const Chapter = require("../../models/chapter");

const chapterController = {
  getAllChapters: async (req, res) => {
    try {
      const chapters = await Chapter.find();
      res.status(200).json(chapters);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  getChaptersById: async (req, res) => {
    try {
      const chapters = await Chapter.find({ course_id: req.params.id });
      if (!chapters || chapters.length === 0) {
        return res.status(404).json({ message: "Chapters not found" });
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
  },

  createChapter: async (req, res) => {
    const chapter = new Chapter(req.body);
    try {
      const newChapter = await chapter.save();
      res.status(201).json(newChapter);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  updateChapter: async (req, res) => {
    try {
      console.log("req.params.id", req.params.id)
      const chapter = await Chapter.findById(req.params.id);
      console.log("chapters", chapter)
      
      chapter.title = req.body.title;
      chapter.content = req.body.description;
      const updatedChapter = await chapter.save();
      res.status(200).json(updatedChapter);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  deleteChapter: async (req, res) => {
    try {
      const chapter = await Chapter.findByIdAndRemove(req.params.id);

      res.status(200).json({ message: "Chapter deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

module.exports = chapterController;
