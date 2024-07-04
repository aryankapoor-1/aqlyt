const sectionItemsModel = require("../models/sectionItemsModel");
const response  = require("../helpers/apiResponse");

// CREATE FOOD
const createSecItemsController = async (req, res) => {
  try {
    const {
      name,
      sectionId,
      menuId,
      description,
      price,
      imageUrl,
      sortOrderId,
      status,
    } = req.body;

    if (!name || !description || !price || !menuId || !sectionId) {
      return response.errorResponse(res, false, "Please Provide All Fields");
    }
    const newSectionItem = new sectionItemsModel({
      name,
      sectionId,
      menuId,
      description,
      price,
      imageUrl,
      sortOrderId,
      status,
    });

    await newSectionItem.save();
    response.createdSuccessfully(res, true, "New Section Item Created", newSectionItem);
  } catch (error) {
    console.log(error);
    return response.internalServerErrorResponse(res, false, "Error in Create Section Item API", error);
  }
};

// GET ALLL FOODS
const getAllSecItemsController = async (req, res) => {
  try {
    const sectionItems = await sectionItemsModel.find({});
    if (!sectionItems) {
      return response.notFoundResponse(res, false, "No Section Item was found");
    }
    response.okResponse(res, true, `totalSectionItems: ${sectionItems.length}`, sectionItems);
  } catch (error) {
    console.log(error);
    return response.internalServerErrorResponse(res, false, "Error In Get ALL Section Items API", error);
  }
};

// GET SINGLE FOOD
const getSingleSecItemController = async (req, res) => {
  try {
    const sectionItemId = req.params.id;
    if (!sectionItemId) {
      return response.notFoundResponse(res, false, "Please provide id");
    }
    const sectionItem = await sectionItemsModel.findById(sectionItemId);
    if (!sectionItem) {
      return response.notFoundResponse(res, false, "No Section Item Found with this id");
    }
    response.okResponse(res, true, "Get Successful",sectionItem);
  } catch (error) {
    console.log(error);
    return response.internalServerErrorResponse(res, false, "Error In Get Single Section Item API", error);
  }
};

// UPDATE FOOD ITEm
const updateSecItemsController = async (req, res) => {
  try {
    const sectionItemId = req.params.id;
    if (!sectionItemId) {
      return response.notFoundResponse(res, false, "No Section Item id was found");
    }
    const sectionItem = await sectionItemsModel.findById(sectionItemId);
    if (!sectionItem) {
      return response.notFoundResponse(res, false, "No Section Item Found");
    }
    const {
      name,
      sectionId,
      menuId,
      description,
      price,
      imageUrl,
      sortOrderId,
      status,
    } = req.body;
    await sectionItemsModel.findByIdAndUpdate(
      foodID,
      {
        name,
        sectionId,
        menuId,
        description,
        price,
        imageUrl,
        sortOrderId,
        status,
      },
      { new: true }
    );
    response.okResponse(res, true, "Section Item Was Updated");
  } catch (error) {
    console.log(error);
    response.internalServerErrorResponse(res, false, "Erorr In Update Section Item API", error);
  }
};

// DELETE FOOD
const deleteSecItemsController = async (req, res) => {
  try {
    const sectionId = req.params.id;
    if (!sectionId) {
      return response.notFoundResponse(res, false, "Provide sectionId");
    }
    const section = await sectionItemsModel.findById(sectionId);
    if (!section) {
      return response.notFoundResponse(res, false, "No Section Item Found with id");
    }
    await sectionItemsModel.findByIdAndDelete(sectionId);
    response.okResponse(res, true, "Food Item Deleted ");
  } catch (error) {
    console.log(error);
    response.internalServerErrorResponse(res, false, "Error In Delete Section Item APi", error);
  }
};

module.exports = {
  createSecItemsController,
  getAllSecItemsController,
  getSingleSecItemController,
  updateSecItemsController,
  deleteSecItemsController,
};
