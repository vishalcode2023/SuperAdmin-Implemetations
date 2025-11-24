const KnowledgeMaterial = require("../Models/KnowledgeMaterial");
const Course = require("../Models/Course");
const Batch = require("../Models/BatchModel");

// ✅ CREATE (SuperAdmin)
exports.createMaterial = async (req, res) => {
  try {
    const { course, batch } = req.body;

    const courseExists = await Course.findById(course);
    if (!courseExists)
      return res.status(404).json({ success: false, message: "Course not found" });

    const batchExists = await Batch.findById(batch);
    if (!batchExists)
      return res.status(404).json({ success: false, message: "Batch not found" });

    const material = await KnowledgeMaterial.create(req.body);

    res.status(201).json({ success: true, material });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// ✅ UPDATE (SuperAdmin)
exports.updateMaterial = async (req, res) => {
  try {
    const material = await KnowledgeMaterial.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({ success: true, material });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// ✅ DELETE (SuperAdmin)
exports.deleteMaterial = async (req, res) => {
  try {
    await KnowledgeMaterial.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Material deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ GET ALL MATERIALS FOR A STUDENT (READ ONLY)
exports.getMaterialsByBatch = async (req, res) => {
  try {
    const materials = await KnowledgeMaterial.find({ batch: req.params.batchId })
      .populate("course")
      .populate("batch");

    res.json({ success: true, materials });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ GET SINGLE MATERIAL
exports.getMaterial = async (req, res) => {
  try {
    const material = await KnowledgeMaterial.findById(req.params.id)
      .populate("course")
      .populate("batch");

    if (!material)
      return res.status(404).json({ success: false, message: "Material not found" });

    res.json({ success: true, material });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
