const express = require("express");
const router = express.Router();

const {
  SuperAdminCreateUser,
  UserLogin,
  UserForgotPassword,
  AdminRegister,
  AdminLogin,
  SuperAdminRegister,
  SuperAdminLogin
} = require("../Controller/AuthController");

const { User } = require("../Models/UserModel");
const { Admin } = require("../Models/AdminModel");
const { SuperAdmin } = require("../Models/SuperAdminModel");

const verify = require("../Middlewares/JwtVerify");

// =================== User Routes ===================
// User login using studentid and password
router.post("/user/login", UserLogin);

// User forgot password
router.post("/user/forgot-password", UserForgotPassword);

// =================== SuperAdmin creates users ===================
router.post("/superadmin/create-user", verify(SuperAdmin), SuperAdminCreateUser);

// =================== Admin Routes ===================
router.post("/admin/register", verify(SuperAdmin), AdminRegister);
router.post("/admin/login", AdminLogin);

// =================== SuperAdmin Routes ===================
router.post("/superadmin/register", SuperAdminRegister);
router.post("/superadmin/login", SuperAdminLogin);

module.exports = router;
