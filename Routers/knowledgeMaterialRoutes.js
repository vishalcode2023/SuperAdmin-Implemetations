const express = require("express");
const router = express.Router();
const controller = require("../Controller/knowledgeMaterialController");

// ✅ SuperAdmin
router.post("/", controller.createMaterial);
router.put("/:id", controller.updateMaterial);
router.delete("/:id", controller.deleteMaterial);

// ✅ Students (READ ONLY)
router.get("/batch/:batchId", controller.getMaterialsByBatch);
router.get("/:id", controller.getMaterial);

module.exports = router;
