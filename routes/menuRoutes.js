const express = require("express");
const upload = require("../middlewares/multer");

const authMiddleware = require("../middlewares/authMiddleware");
const {
  createMenuController,
  getAllMenuController,
  getMenuController,
  updateMenuController,
  deleteMenuController,
  updateMenuStatusController,
} = require("../controllers/menuController");

const router = express.Router();

//routes
// CREATE Menu
router.post("/create", upload.any("imageUrl"), authMiddleware, createMenuController);

//GET ALL Menu
router.get("/getAll", getAllMenuController);

//GET Menu BY ID
router.get("/get", getMenuController);

// UPDATE Menu
router.put("/update", upload.any("imageUrl"), authMiddleware, updateMenuController);

// UPDATE Menu Status
router.put("/updateStatus", authMiddleware, updateMenuStatusController);

// DLEETE Menu
router.delete("/delete/:id", authMiddleware, deleteMenuController);

module.exports = router;
