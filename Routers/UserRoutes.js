const express = require("express");
const router = express.Router();

const verify = require("../Middlewares/JwtVerify");
const { SuperAdmin } = require("../Models/SuperAdminModel");

const {
    GetAllUsers,
    GetUserById,
    UpdateUser,
    DeleteUser
} = require("../Controllers/UserController");

router.use(verify(SuperAdmin));

router.get("/users", GetAllUsers);
router.get("/users/:id", GetUserById);
router.put("/users/:id", UpdateUser);
router.delete("/users/:id", DeleteUser);

module.exports = router;
