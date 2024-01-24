// models/Course.js
const mongoose = require("mongoose");

const sectionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, 
  },
  description: String,
});

module.exports = mongoose.model("section", sectionSchema);
