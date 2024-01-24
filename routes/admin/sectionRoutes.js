const express = require("express");
const router = express.Router();
const sectionController = require("../../controllers/admin/sectionController");
const auth = require("../../utils/auth");

router.post("/addSection", auth, sectionController.createSection);
router.get("/getAllSection", auth, sectionController.getAllSections);
router.get("/section/:id", auth, sectionController.getSectionById);
router.put("/updateSection/:id", auth, sectionController.updateSectionById);
router.delete("/section/:id", auth, sectionController.deleteSectionById);

module.exports = router;
