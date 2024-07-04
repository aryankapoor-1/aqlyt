const express = require("express");
const upload = require("../middlewares/multer");

const authMiddleware = require("../middlewares/authMiddleware");
const {
  createSecController,
  getSecController,
  getAllSecController,
  updateSecController,
  updateSectionStatusController,
  deleteSecController,
} = require("../controllers/sectionController");

const router = express.Router();

//routes
// CREATE SEC
router.post("/create", upload.any("imageUrl"), authMiddleware, createSecController);

// GET ALL SEC
router.get("/get", getSecController);

//GET ALL SEC BASED ON MENU SELECTION
router.get("/getAll", getAllSecController);

// UPDATE SEC
router.put("/update", upload.any("imageUrl"), authMiddleware, updateSecController);

// UPDATE SEC STATUS
router.put("/updateStatus", authMiddleware, updateSectionStatusController);

// DLEETE CAT
router.delete("/delete/:id", authMiddleware, deleteSecController);

module.exports = router;
