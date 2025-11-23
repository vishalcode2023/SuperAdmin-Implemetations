const { Admin } = require("../Models/AdminModel");


const DeleteAdminById = async (req, res) => {
  try {
    const { id } = req.params; // get admin ID from URL
    if (!id) return res.status(400).json({ message: "Admin ID is required" });

    const deletedAdmin = await Admin.findByIdAndDelete(id);
    if (!deletedAdmin) return res.status(404).json({ message: "Admin not found" });

    res.status(200).json({ message: "Admin deleted successfully", admin: deletedAdmin });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  DeleteAdminById
};