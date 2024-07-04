const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const response = require("../helpers/apiResponse");

// GET USER INFGO
const getUserController = async (req, res) => {
  try {
    // find user
    const user = await userModel.findById({ _id: req.body.id });
    //validation
    if (!user) {
      return response.notFoundResponse(res, false, "User Not Found");
    }
    //hide password
    user.password = undefined;
    //resp
    response.okResponse(res, true, "User get Successfully", user);
  } catch (error) {
    console.log(error);
    response.internalServerErrorResponse(res, false, "Eror in Get User API", error);
  }
};

// UPDATE USER
const updateUserController = async (req, res) => {
  try {
    // find user
    const user = await userModel.findById({ _id: req.body.id });
    //validation
    if (!user) {
      return response.notFoundResponse(res, false, "user not found");
    }
    //update
    const { userName, address, phone } = req.body;
    if (userName) user.userName = userName;
    if (address) user.address = address;
    if (phone) user.phone = phone;
    //save user
    await user.save();
    response.okResponse(res, true, "USer Updated SUccessfully");
  } catch (error) {
    console.log(error);
    response.internalServerErrorResponse(res, false, "Error In Udpate Userr API", error);
  }
};

// UPDATE USER PASSWORR
const updatePasswordController = async (req, res) => {
  try {
    //find user
    const user = await userModel.findById({ _id: req.body.id });
    //valdiation
    if (!user) {
      return response.notFoundResponse(res, false, "Usre Not Found");
    }
    // get data from user
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return response.errorResponse(res, false, "Please Provide Old or New PasswOrd");
    }
    //check user password  | compare password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return response.internalServerErrorResponse(res, false, "Invalid old password");
    }
    //hashing password
    var salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();
    response.okResponse(res, true, "Password Updated!");
  } catch (error) {
    console.log(error);
    response.internalServerErrorResponse(res, false, "Error In Password Update API", error);
  }
};

// RESET PASSWORd
const resetPasswordController = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    if (!email || !newPassword ) {
      return response.errorResponse(res, false, "Please Privide All Fields");
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return response.notFoundResponse(res, false, "User Not Found or invlaid answer");
    }
    //hashing password
    var salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();
    response.okResponse(res, true, "Password Reset SUccessfully");
  } catch (error) {
    console.log(error);
    response.internalServerErrorResponse(res, false, "eror in PASSWORD RESET API", error);
  }
};

// DLEETE PROFILE ACCOUNT
const deleteProfileController = async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.params.id);
    return response.okResponse(res, true, "Your account has been deleted");
  } catch (error) {
    console.log(error);
    response.internalServerErrorResponse(res, false, "Erorr In Delete Profile API", error);
  }
};

module.exports = {
  getUserController,
  updateUserController,
  updatePasswordController,
  resetPasswordController,
  deleteProfileController,
};
