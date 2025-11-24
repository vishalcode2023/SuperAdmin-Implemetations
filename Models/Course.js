const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  courseId: { type: Number, required: true, unique: true },
  description: { type: String, required: true },
  duration: { type: String, required: true },
  students: { type: Number, default: 0 },
  modules: [{ type: mongoose.Schema.Types.ObjectId, ref: "Module" }],
}, { timestamps: true });

module.exports = mongoose.model("Course", courseSchema);
