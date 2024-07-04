const mongoose = require("mongoose");

//schema
const sectionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    menuId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Menu",
      required: true,
    },
    sortOrderId: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      default:
        "https://image.similarpng.com/very-thumbnail/2021/09/Good-food-logo-design-on-transparent-background-PNG.png",
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

//export
module.exports = mongoose.model("Section", sectionSchema);
