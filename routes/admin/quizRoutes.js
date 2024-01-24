const express = require("express");
const router = express.Router();
const verifyUser = require("../../utils/auth");
const { quizController } = require("../../controllers/admin/quizController");

router.post("/addQuiz", verifyUser, quizController.addQuiz);
router.get("/getAllQuiz", verifyUser, quizController.getQuiz);
router.get("/quizzes/:id", verifyUser, quizController.getQuizByID);
router.put("/quizzes/:id", verifyUser, quizController.updateQuizByID);
router.delete("/deleteQuiz/:id", verifyUser, quizController.deleteQuizById);

module.exports = router;
