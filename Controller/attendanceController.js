const Attendance = require("../Models/Attendance");
const User = require("../Models/UserModel");
const Batch = require("../Models/BatchModel");

// ✅ Mark Attendance
exports.markAttendance = async (req, res) => {
  try {
    const { batch, attendanceList, date } = req.body;

    const batchExists = await Batch.findById(batch);
    if (!batchExists)
      return res.status(404).json({ message: "Batch not found" });

    // attendanceList = [{ student: id, status: "Present" }]
    for (const record of attendanceList) {
      await Attendance.findOneAndUpdate(
        { batch, student: record.student, date },
        { status: record.status },
        { upsert: true }
      );
    }

    res.status(200).json({ message: "Attendance marked successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ✅ Get Students in Batch + Today Attendance
exports.getBatchAttendance = async (req, res) => {
  try {
    const { batchId, date } = req.params;

    const students = await User.find({ batch: batchId });

    const attendance = await Attendance.find({ batch: batchId, date });

    res.status(200).json({ students, attendance });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ✅ Get Attendance Percentage for Student
exports.getStudentAttendance = async (req, res) => {
  try {
    const { studentId } = req.params;

    const total = await Attendance.countDocuments({ student: studentId });
    const present = await Attendance.countDocuments({ student: studentId, status: "Present" });

    const percentage = total === 0 ? 0 : ((present / total) * 100).toFixed(2);

    res.status(200).json({ total, present, percentage });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



