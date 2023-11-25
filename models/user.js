const mongoose = require("mongoose");
const joi = require("joi");

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  birthday: {
    type: Date,
    required: true,
  },
  fathername: {
    type: String,
    required: true,
  },
  fatherphone: {
    type: String,
    required: true,
    trim: true,
  },
  added_date: {
    type: Date,
    default: Date.now,
  },
  updated_date: {
    type: Date,
    default: Date.now,
  },
  accept_status: {
    type: Boolean,
    default: false,
  },
});

function validationRegisterUser(obj) {
  const schema = joi.object({
    firstname: joi.string().min(3).required(),
    lastname: joi.string().min(3).required(),
    email: joi.string().trim().email().required(),
    password: joi.string().min(6).required(),
    birthday: joi.date().required(),
    fathername: joi.string().min(3).required(),
    fatherphone: joi.string().required(),
  });
  return schema.validate(obj);
}
function validationLoginUser(obj) {
  const schema = joi.object({
    email: joi.string().email().trim().required(),
    password: joi.string().required(),
  });
  return schema.validate(obj);
}

const User = mongoose.model("User", userSchema);

module.exports = {
  User,
  validationRegisterUser,
  validationLoginUser,
};
