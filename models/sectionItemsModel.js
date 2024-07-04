const mongoose = require("mongoose");
const itemPriceModel = require("./itemPriceModel");

const sectionItemsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    sectionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Section",
    },
    menuId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Menu",
    },
    description: {
      type: String,
      required: true,
    },
    price: [ itemPriceModel ],
    imageUrl: {
      type: String,
      default:
        "https://image.similarpng.com/very-thumbnail/2021/09/Good-food-logo-design-on-transparent-background-PNG.png",
    },
    sortOrderId: {
      type: String,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

//export
module.exports = mongoose.model("SectionItems", sectionItemsSchema);
