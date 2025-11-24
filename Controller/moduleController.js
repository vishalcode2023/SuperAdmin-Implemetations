const Module = require("../Models/ModuleModel");
const Course = require("../Models/Course");

exports.createModule = async (req, res) => {
  try {
    const { course } = req.body;

    const courseExists = await Course.findById(course);
    if (!courseExists)
      return res.status(404).json({ success: false, message: "Course not found" });

    const moduleData = await Module.create(req.body);

    courseExists.modules.push(moduleData._id);
    await courseExists.save();

    res.status(201).json({ success: true, module: moduleData });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getModules = async (req, res) => {
  try {
    const modules = await Module.find().populate("course");
    res.json({ success: true, modules });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getModule = async (req, res) => {
  try {
    const moduleData = await Module.findById(req.params.id).populate("course");
    if (!moduleData)
      return res.status(404).json({ success: false, message: "Module not found" });

    res.json({ success: true, module: moduleData });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateModule = async (req, res) => {
  try {
    const moduleData = await Module.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, module: moduleData });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.deleteModule = async (req, res) => {
  try {
    const moduleData = await Module.findById(req.params.id);

    if (!moduleData)
      return res.status(404).json({ success: false, message: "Module not found" });

    await Course.findByIdAndUpdate(moduleData.course, {
      $pull: { modules: moduleData._id },
    });

    await Module.findByIdAndDelete(req.params.id);

    res.json({ success: true, message: "Module deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
