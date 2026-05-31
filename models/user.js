const mongoose = require("mongoose");
const validator = require("validator");
const { INVALID_URL } = require("../utils/errors");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
      message: INVALID_URL,
    },
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
