const resturantModel = require("../models/resturantModel");
const response = require("../helpers/apiResponse");
const openingTimesModel = require("../models/openingTimesModel");

// CREATE RESTURANT
const createResturantController = async (req, res) => {
  try {
    const {
      resturantName,
      email,
      address,
      disableOrders,
      logo,
      timeZone,
      resturantBio,
      phoneNumber,
    } = req.currentRestaurant;
    // validation
    if (!resturantName || !address) {
      return response.errorResponse(
        res,
        false,
        "please provide Restaurant Name and Address"
      );
    }
    const newRestaurant = new resturantModel({
      resturantName,
      email,
      address,
      disableOrders,
      logo,
      timeZone,
      resturantBio,
      phoneNumber,
    });

    await newRestaurant.save();

    response.createdSuccessfully(
      res,
      true,
      "New Restaurant Created successfully"
    );
  } catch (error) {
    console.log(error);
    response.internalServerErrorResponse(
      res,
      false,
      "Error In Create Restaurant api",
      error
    );
  }
};

// GET ALL RESTURNAT
const getAllResturantController = async (req, res) => {
  try {
    const restaurants = await resturantModel.find({});
    if (restaurants.length == 0) {
      return response.notFoundResponse(res, false, "No Restaurant Availible");
    }
    // Modified for Single Restaurant
    const resturantId = restaurants[0]._id;
    if (!resturantId) {
      return response.notFoundResponse(res, false, "Restaurnat ID Not Found");
    }

    //Get Opening Times
    const openingTimes = await openingTimesModel.find({ resturantId });
    response.okResponse(res, true, `totalCount: ${restaurants.length}`, {
      restaurants,
      openingTimes,
    });
  } catch (error) {
    console.log(error);
    response.internalServerErrorResponse(
      res,
      false,
      "Error In Get ALL Restaurant API",
      error
    );
  }
};

// GET RESTAURANT BY ID
const getResturantByIdController = async (req, res) => {
  try {
    const resturantId = req.currentRestaurant._id;
    if (!resturantId) {
      return response.notFoundResponse(
        res,
        false,
        "Please Provide Restaurnat ID"
      );
    }
    //find resturant
    const resturant = await resturantModel.findById(resturantId);
    if (!resturant) {
      return response.notFoundResponse(res, false, "no restaurant found");
    }
    response.okResponse(
      res,
      true,
      "GET Single Restaurant Successfull",
      resturant
    );
  } catch (error) {
    console.log(error);
    response.internalServerErrorResponse(
      res,
      false,
      "Error In Get Restaurarnt by id api",
      error
    );
  }
};

//UPDATE RESTAURANT
const updateResturantController = async (req, res) => {
  try {
    const resturantId = req.currentRestaurant._id;
    if (!resturantId) {
      return response.notFoundResponse(
        res,
        false,
        "No Restaurant Found Or Provide Restaurant ID"
      );
    }
    const updatedData = req.body;
    await resturantModel.findByIdAndUpdate(resturantId, updatedData, {
      new: true,
    });
    response.okResponse(res, true, "Restaurant Updated Successfully", updatedData);
  } catch (error) {
    console.log(error);
    response.internalServerErrorResponse(
      res,
      false,
      "Error in update restaurant api",
      error
    );
  }
};

//DELETE RESTRURNAT
const deleteResturantController = async (req, res) => {
  try {
    const resturantId = req.params.id;
    if (!resturantId) {
      return response.notFoundResponse(
        res,
        false,
        "No Restaurant Found OR Provide Restaurant ID"
      );
    }
    await resturantModel.findByIdAndDelete(resturantId);
    response.okResponse(res, true, "Restaurant Deleted Successfully");
  } catch (error) {
    console.log(error);
    response.internalServerErrorResponse(
      res,
      false,
      "Error in delete restaurant api",
      error
    );
  }
};

// UPDATE OPENING TIMES
const updateOpeningTimesController = async (req, res) => {
  try {
    const { idsToUpdate, newData } = req.body;

    if(idsToUpdate.length > 0){
      for (let i = 0; i < idsToUpdate.length; i++) {
        await openingTimesModel.updateMany(
          { _id: idsToUpdate[i] },
          { $set: newData[i] }
        );
      }
      response.okResponse(res, true, "Time Updated successfully");
    }
  } catch (error) {
    console.log(error);
    response.internalServerErrorResponse(
      res,
      false,
      "Error in update openingTimes api",
      error
    );
  }
};

module.exports = {
  createResturantController,
  getAllResturantController,
  getResturantByIdController,
  updateResturantController,
  deleteResturantController,
  updateOpeningTimesController,
};
