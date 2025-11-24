const { User } = require("../Models/UserModel");

const GetAllUsers = async (req, res) => {
    try {
        const users = await User.find()
            .populate("course")
            .populate("batch");

        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
};

// ✅ Get user by ID
const GetUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
            .populate("course")
            .populate("batch");

        if (!user) return res.status(404).json({ message: "User not found" });

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
};

// ✅ Update user
const UpdateUser = async (req, res) => {
    try {
        const updateData = req.body;

        const user = await User.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );

        if (!user) return res.status(404).json({ message: "User not found" });

        res.status(200).json({
            message: "User updated successfully",
            user
        });

    } catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
};

const DeleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) return res.status(404).json({ message: "User not found" });

        res.status(200).json({ message: "User deleted successfully" });

    } catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    GetAllUsers,
    GetUserById,
    UpdateUser,
    DeleteUser
};
