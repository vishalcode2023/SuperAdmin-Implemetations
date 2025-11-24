const express = require("express");
const router = express.Router();
const moduleController = require("../Controller/moduleController");

router.post("/", moduleController.createModule);
router.get("/", moduleController.getModules);
router.get("/:id", moduleController.getModule);
router.put("/:id", moduleController.updateModule);
router.delete("/:id", moduleController.deleteModule);

module.exports = router;
