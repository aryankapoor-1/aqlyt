const JWT = require("jsonwebtoken");
const response = require("../helpers/apiResponse");
const Resturant = require("../models/resturantModel");

module.exports = async (req, res, next) => {
  try {
    // get token
    const token = req.headers["authorization"].split(" ")[1];
    JWT.verify(token, process.env.JWT_SECRET, async (err, decode) => {
      if (err) {
        return response.unauthorizeResponse(res, true, "Un-Authorize User");
      } else {
        let findRestaurant = await Resturant.findOne({ _id: decode.id });
        if (findRestaurant) {
          req.currentRestaurant = findRestaurant;
          next();
        } else {
          return response.errorResponse(res, false, "Restaurant does'nt Exist");
        }
      }
    });
  } catch (error) {
    console.log(error);
    response.internalServerErrorResponse(res, false, "Please provide Auth Token", error);
  }
};
