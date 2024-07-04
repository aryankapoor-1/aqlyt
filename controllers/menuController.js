const menuModel = require("../models/menuModel");
const sectionModel = require("../models/sectionModel");
const response = require("../helpers/apiResponse");

// CREATE MENU
const createMenuController = async (req, res) => {
  try {
    const { name, description } = req.body;
    // Validation
    if (!name || !description) {
      return response.errorResponse(res, false, "Please provide Menu Name");
    }
    const newMenu = new menuModel({
      name,
      description,
      imageUrl: `http://192.168.1.194:8080/${req.files[0].filename}`,
      status: false,
    });
    await newMenu.save();

    // Send the response with the URL of the uploaded image
    response.createdSuccessfully(res, true, "Menu created", newMenu);
  } catch (error) {
    console.log(error);
    response.internalServerErrorResponse(
      res,
      false,
      "Error In Create Menu API",
      error
    );
  }
};

// GET ALL Menu
const getAllMenuController = async (req, res) => {
  try {
    const menus = await menuModel.find({});
    if (!menus) {
      response.notFoundResponse(res, false, "No Menu found");
    }
    response.okResponse(res, true, `totalCatLength: ${menus.length}`, menus);
  } catch (error) {
    console.log(error);
    response.internalServerErrorResponse(
      res,
      false,
      "Erorr in get All Menu API",
      error
    );
  }
};

// GET MENU BY ID
const getMenuController = async (req, res) => {
  try {
    const { id } = req.body;
    const menu = await menuModel.findById(id);
    if (!menu) {
      response.notFoundResponse(res, false, "No Menu found with this id");
    }
    response.okResponse(res, true, "Info. displayed", menu);
  } catch (error) {
    console.log(error);
    response.internalServerErrorResponse(
      res,
      false,
      "Erorr in get All Menu API",
      error
    );
  }
};

// UPDATE Menu
const updateMenuController = async (req, res) => {
  try {
    const { id, name, description } = req.body;
    const dataToUpdate = {};
    if (name) {
      dataToUpdate.name = name;
    }
    if (description) {
      dataToUpdate.description = description;
    }
    if (req.files && req.files.length) {
      dataToUpdate.imageUrl = `http://192.168.1.194:8080/${req.files[0].filename}`;
    }
    const updatedMenu = await menuModel.findByIdAndUpdate(id, dataToUpdate, {
      new: true,
    });
    if (!updatedMenu) {
      return response.errorResponse(res, false, "No Menu Found");
    }
    return response.okResponse(
      res,
      true,
      "Menu Updated Successfully",
      updatedMenu
    );
  } catch (error) {
    console.log(error);
    response.internalServerErrorResponse(
      res,
      false,
      "Error in Update Menu API",
      error
    );
  }
};

// UPDATE Menu Status
const updateMenuStatusController = async (req, res) => {
  try {
    const { id, status } = req.body;

    // Update the menu status
    const updatedMenu = await menuModel.findByIdAndUpdate(
      id,
      { $set: { status } },
      { new: true }
    );
    // Find all menus with status true (excluding the updated menu)
    const activeMenus = await menuModel.find({
      _id: { $ne: id },
      status: true,
    });

    // Update the active menus to false
    await Promise.all(
      activeMenus.map((menu) =>
        menuModel.findByIdAndUpdate(
          menu._id,
          { $set: { status: false } },
          { new: true }
        )
      )
    );
    response.okResponse(
      res,
      true,
      "Menu Status Updated Successfully",
      updatedMenu
    );
  } catch (error) {
    console.log(error);
    response.internalServerErrorResponse(
      res,
      false,
      "Error in Update Menu Status API",
      error
    );
  }
};

// DELETE Menu
const deleteMenuController = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      response.errorResponse(res, false, "Please provide Menu ID");
    }

    // Find and delete sections associated with this menu
    await sectionModel.deleteMany({ menuId: id });

    // Delete the menu itself
    const menu = await menuModel.findByIdAndDelete(id);

    if (!menu) {
      response.errorResponse(res, false, "No Menu Found With this id");
    }

    response.okResponse(
      res,
      true,
      "Menu and associated sections deleted successfully"
    );
  } catch (error) {
    console.log(error);
    response.internalServerErrorResponse(
      res,
      false,
      "Error in Delete Menu api",
      error
    );
  }
};

module.exports = {
  createMenuController,
  getAllMenuController,
  getMenuController,
  updateMenuController,
  updateMenuStatusController,
  deleteMenuController,
};
