const mongoose = require("mongoose");
const SliderData = mongoose.Schema({
  img: {
    type: String,
    required: true,
  },
  description: {
    type: [String],
    required: true,
  },
  moviename: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
});
const SliderDataSchema = mongoose.model("SliderData", SliderData);
module.exports = SliderDataSchema;
