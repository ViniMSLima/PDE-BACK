const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
  },
  carplate: {
    type: String,
    required: true,
    minlength: 7,
  },
  residence: {
    type: String,
    required: true,
    minlength: 1
  },
  carbrand: {
    type: String,
    required: true,
    minlength: 1
  },
  carmodel: {
    type: String,
    required: true,
    minlength: 1
  },
  caryear: {
    type: String,
    required: true,
    minlength: 4
  },
  cpf: {
    type: String,
    required: true,
    minlength: 11,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  updatedAt: {
    type: Date,
    required: false,
  },
  removedAt: {
    type: Date,
    required: false,
  },
});

const User = mongoose.model("User", UserSchema);
exports.User = User;
exports.UserSchema = UserSchema;