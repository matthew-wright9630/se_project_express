const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 2,
    maxLength: 30,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "You must enter a valid URL",
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(value) {
        return validator.isEmail(value);
      },
      message: "You must enter a valid email address",
    },
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password
) {
  return this.findOne({ email })
    .select("+password")
    .then((user) => {
      if (password === undefined || email === undefined) {
        const error = new Error("Incorrect email or password");
        error.name = "ValidationError";
        throw error;
      }
      if (!user) {
        const error = new Error("Incorrect email or password");
        error.name = "AuthenticationError";
        throw error;
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          const error = new Error("Incorrect email or password");
          error.name = "AuthenticationError";
          throw error;
        }

        return user;
      });
    });
};

module.exports = mongoose.model("user", userSchema);
