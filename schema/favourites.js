const mongoose = require("mongoose");

const favourites = mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId, ref: "users" },
  cardId: { type: mongoose.Types.ObjectId, ref: "cards" },
});

const FouritiesSchema = mongoose.model("favourities", favourites);
module.exports = FouritiesSchema;
