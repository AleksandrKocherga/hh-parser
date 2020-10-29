const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userShema = Schema({
  name: { type: String, require: true },
  email: { type: String, require: true },
  password: { type: String, require: true },
  status: { type: Boolean, default: false },
});

module.exports = mongoose.model("User", userShema);
