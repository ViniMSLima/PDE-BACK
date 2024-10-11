const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
  },
  residence: {
    type: String,
    required: true,
    minlength: 1
  },
  cpf: {
    type: String,
    required: true,
    minlength: 11,
  },
  carsId: [{
    type: String,
    required: true,
    minlength: 11,
  }],
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