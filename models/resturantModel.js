const mongoose = require("mongoose");

//schema
const resturantSchema = new mongoose.Schema(
  {
    resturantName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    disableOrders: {
      type: Boolean,
      default: false,
    },
    logo: {
      type: String,
    },
    timeZone: {
      type: String,
    },
    resturantBio: {
      type: String,
    },
    phoneNumber: [
      {
        type: String,
        required: true,
      },
    ],
  },
  { timestamps: true }
);

//export
module.exports = mongoose.model("Resturant", resturantSchema);
