const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const response = require("../helpers/apiResponse");

// REGISTER
const registerController = async (req, res) => {
  try {
    const { userName, email, password, phone, address, resturantId } = req.body;
    //validation
    if (!userName || !email || !password || !address || !phone || !resturantId) {
      return response.errorResponse(res, false, "Please Provide All Fields");
    }
    // chekc user
    const exisiting = await userModel.findOne({ email });
    if (exisiting) {
      return response.errorResponse(
        res,
        false,
        "Email Already Registerd please Login"
      );
    }
    //hashing password
    var salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    //create new user
    const user = await userModel.create({
      userName,
      email,
      password: hashedPassword,
      address,
      phone,
      resturantId
    });
    response.createdSuccessfully(res, true, "Successfully Registered", user);
  } catch (error) {
    console.log(error);
    response.internalServerErrorResponse(
      res,
      false,
      "Error In Register API",
      error
    );
  }
};

// LOGIN
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return response.errorResponse(
        res,
        false,
        "Please PRovide EMail OR Password"
      );
    }
    //check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return response.notFoundResponse(res, false, "User Not Found");
    }
    //check user password  | compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return response.errorResponse(res, false, "Invalid Credentials");
    }
    // token
    const token = JWT.sign({ id: user.resturantId }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    user.password = undefined;
    const { resturantId } = user;
    response.okResponseWithToken(res, true, "Login Successfully", token, { user, resturantId });
  } catch (error) {
    console.log(error);
    response.internalServerErrorResponse(
      res,
      false,
      "Error In Login API",
      error
    );
  }
};

module.exports = { registerController, loginController };
