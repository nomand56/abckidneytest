const Quiz = require("../../models/addQuiz");

const quizController = {
  addQuiz: async (req, res) => {
    try {
      const quiz = new Quiz(req.body);
      await quiz.save();
      res.status(201).json(quiz);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  getQuiz: async (req, res) => {
    try {
      const quizzes = await Quiz.find();
      res.json(quizzes);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err });
    }
  },
  getQuizByID: async (req, res) => {
    try {
      const quiz = await Quiz.findById(req.params.id);
      if (!quiz) return res.status(404).json({ error: "Quiz not found" });
      res.json(quiz);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  updateQuizByID: async (req, res) => {
    try {
      const quiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!quiz) return res.status(404).json({ error: "Quiz not found" });
      res.json(quiz);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  deleteQuizById: async (req, res) => {
    try {
      const quiz = await Quiz.findByIdAndRemove(req.params.id);
      console.log(quiz);
      if (!quiz) return res.status(404).json({ error: "Quiz not found" });
      res.json({ message: "Quiz deleted successfully" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
  },
};
exports.quizController = quizController;
