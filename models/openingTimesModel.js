const mongoose = require("mongoose");

//schema
const openingTimesSchema = new mongoose.Schema({
  day: {
    type: String,
  },
  openTime: {
    type: String,
  },
  closeTime: {
    type: String,
  },
  isClose: {
    type: Boolean,
  },
  resturantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Resturant",
  },
});

module.exports = mongoose.model("openingtimes", openingTimesSchema);
