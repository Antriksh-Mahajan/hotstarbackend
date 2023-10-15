const mongoose = require("mongoose");

const users = mongoose.Schema({
  username: { type: String },
  password: { type: String },
});

const UsersSchema = mongoose.model("users", users);
module.exports = UsersSchema;
