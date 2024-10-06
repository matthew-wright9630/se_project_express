const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const BadRequestError = require("../errors/bad-request-error");
const UnauthorizedError = require("../errors/unathorized-error");

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
        throw new BadRequestError("Invalid data");
      }
      if (!user) {
        throw new UnauthorizedError("Incorrect email or password");
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          throw new UnauthorizedError("Incorrect email or password");
        }

        return user;
      });
    });
};

module.exports = mongoose.model("user", userSchema);
