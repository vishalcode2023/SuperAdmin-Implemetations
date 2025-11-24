const express = require("express");
const router = express.Router();
const controller = require("../Controller/attendanceController");

// ✅ Mark attendance (SuperAdmin)
router.post("/mark", controller.markAttendance);

// ✅ Get students + attendance for that date
router.get("/batch/:batchId/:date", controller.getBatchAttendance);

// ✅ Get attendance percentage for a student
router.get("/student/:studentId", controller.getStudentAttendance);



module.exports = router;
