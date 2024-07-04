const mongoose = require("mongoose");

//schema
const menuSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      default:
        "https://img.freepik.com/free-psd/coffee-cup-icon-isolated-3d-render-illustration_47987-8773.jpg?w=740&t=st=1714713817~exp=1714714417~hmac=d59e188af381b1261c8e1be3c7a6d0975f75c9c86caa577c375ac1da28a6c936",
    },
    status: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

//export
module.exports = mongoose.model("Menu", menuSchema);
