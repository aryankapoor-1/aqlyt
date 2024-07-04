const mongoose = require("mongoose");

//schema
const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: Array,
    },
    phone: {
      type: String,
      required: true,
    },
    usertype: {
      type: String,
      required: true,
      default: "admin",
      enum: ["clinet", "admin"],
    },
    profile: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png",
    },
    resturantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resturant",
      required: true,
    },
  },
  { timestamps: true }
);

//export
module.exports = mongoose.model("User", userSchema);
