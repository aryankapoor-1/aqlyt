const express = require("express");

const authMiddleware = require("../middlewares/authMiddleware");
const {
  createSecItemsController,
  getAllSecItemsController,
  getSingleSecItemController,
  updateSecItemsController,
  deleteSecItemsController,
} = require("../controllers/sectionItemsController");

const router = express.Router();

//routes
//CREATE FOOD
router.post("/create", authMiddleware, createSecItemsController);

//GET ALL FOOD
router.get("/getAll", getAllSecItemsController);

// GET SINGLE FOOD
router.get("/get/:id", getSingleSecItemController);

// UPDATE FOOD
router.put("/update/:id", authMiddleware, updateSecItemsController);

// DELETE FOOD
router.delete("/delete/:id", authMiddleware, deleteSecItemsController);

module.exports = router;
