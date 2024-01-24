const Flashcard = require("../../models/addFlashcard");

const flashcardController = {
  // @desc    Get all flashcards
  // @route   GET /api/flashcards
  // @access  Public
  getFlashcards: async (req, res, next) => {
    try {
      const flashcards = await Flashcard.find();
      res.status(200).json({
        success: true,
        count: flashcards.length,
        data: flashcards,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  },

  // @desc    Get single flashcard
  // @route   GET /api/flashcards/:id
  // @access  Public
  getFlashcard: async (req, res, next) => {
    try {
      const flashcard = await Flashcard.findById(req.params.id);
      if (!flashcard) {
        return res.status(404).json({ error: "Flashcard not found" });
      }
      res.status(200).json({
        success: true,
        data: flashcard,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  },

  // @desc    Create flashcard
  // @route   POST /api/flashcards
  // @access  Private
  createFlashcard: async (req, res, next) => {
    try {
      const flashcard = await Flashcard.create(req.body);
      res.status(201).json({
        success: true,
        data: flashcard,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  },

  // @desc    Update flashcard
  // @route   PUT /api/flashcards/:id
  // @access  Private
  updateFlashcard: async (req, res, next) => {
    try {
      let flashcard = await Flashcard.findById(req.params.id);
      if (!flashcard) {
        return res.status(404).json({ error: "Flashcard not found" });
      }
      flashcard = await Flashcard.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      res.status(200).json({
        success: true,
        data: flashcard,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  },

  // @desc    Delete flashcard
  // @route   DELETE /api/flashcards/:id
  // @access  Private
  deleteFlashcard: async (req, res, next) => {
    try {
      const flashcard = await Flashcard.findById(req.params.id);
      if (!flashcard) {
        return res.status(404).json({ error: "Flashcard not found" });
      }
      await flashcard.remove();
      res.status(200).json({
        success: true,
        data: {},
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  },
};

module.exports = flashcardController;
