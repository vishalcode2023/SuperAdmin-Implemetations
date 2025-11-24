const mongoose = require("mongoose");

const batchSchema = new mongoose.Schema({
  batchNo: { type: String, required: true },
  batchName: { type: String, required: true },

  // Relation with Course
  course: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true
  },

  // ✅ Store courseId separately if needed for display
  courseid: {
    type: String,
    trim: true
  },

  // ✅ Added start & end dates
  startdate: {
    type: Date,
    default: null
  },

  enddate: {
    type: Date,
    default: null
  },

  batchTiming: { 
    type: String, 
    required: true 
  },

  createdAt: { 
    type: Date, 
    default: Date.now 
  },

  studentsCount: { 
    type: Number, 
    default: 0 
  },
});

const Batch = mongoose.model("Batch", batchSchema);

module.exports = Batch;
