const sectionModel = require("../models/sectionModel");
const sectionItemModel = require("../models/sectionItemsModel");
const response = require("../helpers/apiResponse");

// CREATE SEC
const createSecController = async (req, res) => {
  try {
    const { name, menuId, sortOrderId, description } = req.body;
    //validation
    if (!name) {
      return response.errorResponse(res, false, "Please provide Section name");
    }
    const newSection = new sectionModel({
      name,
      menuId,
      sortOrderId,
      description,
      imageUrl: `http://192.168.1.194:8080/${req.files[0].filename}`,
      status: false,
    });
    await newSection.save();
    response.createdSuccessfully(res, true, "Section created", newSection);
  } catch (error) {
    console.log(error);
    response.internalServerErrorResponse(
      res,
      false,
      "Error In Create Section API",
      error
    );
  }
};

// GET ALL SEC
const getSecController = async (req, res) => {
  try {
    const sections = await sectionModel.find({});
    if (!sections) {
      response.notFoundResponse(res, false, "No Section found");
    }
    response.okResponse(
      res,
      true,
      `totalCatLength: ${sections.length}`,
      sections
    );
  } catch (error) {
    console.log(error);
    response.internalServerErrorResponse(
      res,
      false,
      "Erorr in get All Section API",
      error
    );
  }
};

// GET ALL SEC based on menu selection
const getAllSecController = async (req, res) => {
  try {
    const { menuId } = req.query;
    let sections;
    if (menuId) {
      // Filter sections based on menu selection
      sections = await sectionModel.find({ menuId: menuId });
    } else {
      // If no menu selection provided, fetch all sections
      sections = await sectionModel.find({});
    }
    if (!sections || sections.length === 0) {
      return response.notFoundResponse(res, false, "No Sections found");
    }
    response.okResponse(
      res,
      true,
      `Total sections: ${sections.length}`,
      sections
    );
  } catch (error) {
    console.log(error);
    response.internalServerErrorResponse(
      res,
      false,
      "Error in get All Section API",
      error
    );
  }
};

// UPDATE SEC
const updateSecController = async (req, res) => {
  try {
    const { id, name, menuId, sortOrderId, description, status } = req.body;
    const dataToUpdate = {};
    if (name) dataToUpdate.name = name;
    if (menuId) dataToUpdate.menuId = menuId;
    if (sortOrderId) dataToUpdate.sortOrderId = sortOrderId;
    if (description) dataToUpdate.description = description;
    if (status) dataToUpdate.status = status;
    if (req.files && req.files.length) {
      dataToUpdate.imageUrl = `http://192.168.1.194:8080/${req.files[0].filename}`;
    }
    const updatedSection = await sectionModel.findByIdAndUpdate(
      id,
      dataToUpdate,
      { new: true }
    );
    if (!updatedSection) {
      return response.errorResponse(res, false, "No Section Found");
    }
    response.okResponse(res, true, "Section Updated Successfully");
  } catch (error) {
    console.log(error);
    response.internalServerErrorResponse(
      res,
      false,
      "Error in Update Section api",
      error
    );
  }
};

// UPDATE Section Status
const updateSectionStatusController = async (req, res) => {
  try {
    const { id, status } = req.body;

    // Update the section status
    const updatedSection = await sectionModel.findByIdAndUpdate(
      id,
      { $set: { status } },
      { new: true }
    );

    response.okResponse(
      res,
      true,
      "Section Status Updated Successfully",
      updatedSection
    );
  } catch (error) {
    console.log(error);
    response.internalServerErrorResponse(
      res,
      false,
      "Error in Update Section Status API",
      error
    );
  }
};

// DELETE SEC
const deleteSecController = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return response.errorResponse(res, false, "Please provide Section ID");
    }

    // Find and delete section items associated with this section
    await sectionItemModel.deleteMany({ sectionId: id });

    // Delete the section itself
    const section = await sectionModel.findByIdAndDelete(id);
    if (!section) {
      return response.notFoundResponse(
        res,
        false,
        "No Section Found With this id"
      );
    }

    response.okResponse(
      res,
      true,
      "Section and associated section items deleted successfully"
    );
  } catch (error) {
    console.log(error);
    response.internalServerErrorResponse(
      res,
      false,
      "Error in Delete Section API",
      error
    );
  }
};

module.exports = {
  createSecController,
  getSecController,
  getAllSecController,
  updateSecController,
  updateSectionStatusController,
  deleteSecController,
};
