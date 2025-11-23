const express = require("express");
const router = express.Router();

const { DeleteAdminById } = require("../Controller/AdminController");
const verify = require("../Middlewares/JwtVerify"); // Make sure this is module.exports = verify
const { SuperAdmin } = require("../Models/SuperAdminModel");

// Protect all routes in this router so only SuperAdmin can access
router.use(verify(SuperAdmin));

// Delete an admin by ID
router.delete("/admin/:id", DeleteAdminById);

module.exports = router;
