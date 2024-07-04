const express = require("express");

const authMiddleware = require("../middlewares/authMiddleware");
const {
  createResturantController,
  getAllResturantController,
  getResturantByIdController,
  updateResturantController,
  deleteResturantController,
  updateOpeningTimesController,
} = require("../controllers/resturantController");

const router = express.Router();

//routes
// CRAETE RESTURANT || POST
router.post("/create", authMiddleware, createResturantController);

// GET ALL RESTURANTS || GET
router.get("/getAll", getAllResturantController);

// GET RESTURANT BY ID || GET
router.get("/get", getResturantByIdController);

// UPDATE RESTURANT || PUT
router.put("/update", authMiddleware, updateResturantController);

// DELETE RESTURANT || DELETE
router.delete("/delete/:id", authMiddleware, deleteResturantController);

// UPDATE OPENING TIMES || PUT
router.put("/updateTime", authMiddleware, updateOpeningTimesController);

module.exports = router;
