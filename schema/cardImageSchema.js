const mongoose = require("mongoose");
const CardImages = mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
});
const CardImagesSchema = mongoose.model("cardImage", CardImages);
module.exports = CardImagesSchema;
