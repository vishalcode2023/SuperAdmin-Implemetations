const { User } = require("../Models/UserModel");
const { Admin, validateAdmin } = require("../Models/AdminModel");
const { SuperAdmin, validateSuperAdminLogin } = require("../Models/SuperAdminModel");
const bcrypt = require("bcryptjs");
const CreateJwt = require("../Middlewares/JwtCreation");
const crypto = require("crypto");
const sendEmail = require("../Config/NodeMailler");

// =================== User ===================

// SuperAdmin creates a user with auto-generated studentid and password
const SuperAdminCreateUser = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).json({ message: "Email is required" });

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        // Generate studentid (STU-XXXX)
        const studentid = "EPIX" + crypto.randomBytes(4).toString("hex").toUpperCase();
        // Generate password (8-char random)
        const passwordPlain = crypto.randomBytes(4).toString("hex");
        const hashedPassword = await bcrypt.hash(passwordPlain, 10);

        // Create new user
        const newUser = new User({ email, studentid, password: hashedPassword });
        await newUser.save();

        // Send email to user
        await sendEmail(
            email,
            "Your Account Credentials",
            `<p>Hello,</p>
             <p>Your account has been created by the SuperAdmin.</p>
             <p><b>StudentID:</b> ${studentid}</p>
             <p><b>Password:</b> ${passwordPlain}</p>
             <p>Please login and change your password immediately.</p>`
        );

        res.status(201).json({ message: "User created successfully and email sent" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
};

// User login using studentid and password
const UserLogin = async (req, res) => {
    try {
        const { studentid, password } = req.body;
        if (!studentid || !password) return res.status(400).json({ message: "StudentID and password required" });

        const user = await User.findOne({ studentid });
        if (!user) return res.status(400).json({ message: "Invalid StudentID or password" });

        if (user.isActive === 'Complete') {
            return res.status(403).json({ message: "User account is completed and cannot login" });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).json({ message: "Invalid StudentID or password" });

        const token = CreateJwt({ id: user._id, role: user.role });
        res.status(200).json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
};

// User forgot password
const UserForgotPassword = async (req, res) => {
    try {
        const { studentid, newPassword } = req.body;
        if (!studentid || !newPassword) return res.status(400).json({ message: "StudentID and new password required" });

        const user = await User.findOne({ studentid });
        if (!user) return res.status(404).json({ message: "User not found" });

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: "Password updated successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
};

// =================== Admin ===================
const AdminRegister = async (req, res) => {
    try {
        const { error } = validateAdmin(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        const existingAdmin = await Admin.findOne({ email: req.body.email });
        if (existingAdmin) return res.status(400).json({ message: "Email already registered" });

        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newAdmin = new Admin({ email: req.body.email, password: hashedPassword });
        await newAdmin.save();

        res.status(201).json({ message: "Admin registered successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
};

const AdminLogin = async (req, res) => {
    try {
        const { error } = validateAdmin(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        const admin = await Admin.findOne({ email: req.body.email });
        if (!admin) return res.status(400).json({ message: "Invalid email or password" });

        const validPassword = await bcrypt.compare(req.body.password, admin.password);
        if (!validPassword) return res.status(400).json({ message: "Invalid email or password" });

        const token = CreateJwt({ id: admin._id, role: admin.role });
        res.status(200).json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
};

// =================== SuperAdmin ===================
const SuperAdminRegister = async (req, res) => {
    try {
        const { error } = validateSuperAdminLogin(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        const existingSuperAdmin = await SuperAdmin.findOne({ email: req.body.email });
        if (existingSuperAdmin) return res.status(400).json({ message: "Email already registered" });

        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newSuperAdmin = new SuperAdmin({ 
            email: req.body.email, 
            username: req.body.username,
            password: hashedPassword 
        });
        await newSuperAdmin.save();

        res.status(201).json({ message: "SuperAdmin registered successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
};

const SuperAdminLogin = async (req, res) => {
    try {
        const { error } = validateSuperAdminLogin(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        const superadmin = await SuperAdmin.findOne({ email: req.body.email });
        if (!superadmin) return res.status(400).json({ message: "Invalid email or password" });

        const validPassword = await bcrypt.compare(req.body.password, superadmin.password);
        if (!validPassword) return res.status(400).json({ message: "Invalid email or password" });

        const token = CreateJwt({ id: superadmin._id, role: superadmin.role });
        res.status(200).json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    SuperAdminCreateUser,
    UserLogin,
    UserForgotPassword,
    AdminRegister,
    AdminLogin,
    SuperAdminRegister,
    SuperAdminLogin
};
