const mongoose = require("mongoose");

const knowledgeMaterialSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },

  thumbnailImg: {
    type: String,
    default: ""
  },

  pdfUrl: {
    type: String,
    required: true
  },

  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true
  },

  batch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Batch",
    required: true
  },

  description: {
    type: String,
    default: ""
  },

}, { timestamps: true });

module.exports = mongoose.model("KnowledgeMaterial", knowledgeMaterialSchema);
