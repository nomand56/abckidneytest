const mongoose = require('mongoose');

const chapterSchema = new mongoose.Schema({
  course_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const chapter = mongoose.model('chapter', chapterSchema);

module.exports = chapter;
