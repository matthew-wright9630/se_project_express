const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../utils/config");
const User = require("../models/user");
const {
  BAD_REQUEST,
  NOT_FOUND,
  SERVER_ISSUE,
  DUPLICATE_USER_ERROR,
  AUTHENTICATION_ERROR,
  CONFLICT_ERROR,
} = require("../utils/errors");
const BadRequestError = require("../errors/bad-request-error");
const UnauthorizedError = require("../errors/unathorized-error");
const ForbiddenError = require("../errors/forbidden-error");
const NotFoundError = require("../errors/not-found-error");
const ConflictError = require("../errors/conflict-error");

module.exports.createUser = (req, res, next) => {
  const { name, avatar, email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (!email) {
        throw new BadRequestError("Invalid data");
      }
      if (user) {
        throw new ConflictError(
          "Email address is already taken. Please provide a new email"
        );
      }

      return bcrypt.hash(password, 10);
    })
    .then((hash) =>
      User.create({
        name,
        avatar,
        email,
        password: hash,
      })
    )
    .then((user) =>
      res.send({ name: user.name, avatar: user.avatar, email: user.email })
    )
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      if (!email || !password) {
        throw new BadRequestError("Invalid data");
      }
      if (!user) {
        throw new UnauthorizedError("Incorrect email or password");
      }
      res.send({
        user,
        token: jwt.sign({ _id: user._id }, JWT_SECRET, {
          expiresIn: "7d",
        }),
      });
    })
    .catch((err) => {
      console.error(err.message);
      if (err.name === "CastError") {
        next(new BadRequestError("The id string is in an invalid format"));
      } else {
        next(err);
      }
    });
  // .catch((err) => {
  //   console.error(err);
  //   if (err.name === "ValidationError") {
  //     return res.status(BAD_REQUEST).send({ message: "Invalid data" });
  //   }
  //   if (err.name === "AuthenticationError") {
  //     return res
  //       .status(AUTHENTICATION_ERROR)
  //       .send({ message: "Incorrect email or password" });
  //   }
  //   return res
  //     .status(SERVER_ISSUE)
  //     .send({ message: "An error has occurred on the server" });
  // });
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) =>
      res.send({
        name: user.name,
        avatar: user.avatar,
        email: user.email,
        _id: user._id,
      })
    )
    .catch(next);
  // .catch((err) => {
  //   console.error(err);
  //   return res
  //     .status(SERVER_ISSUE)
  //     .send({ message: "An error has occurred on the server" });
  // });
};

module.exports.updateUser = (req, res, next) => {
  const { name, avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .then((user) => {
      if (!name || !avatar) {
        throw new BadRequestError("Invalid data");
      }
      if (!user) {
        throw new NotFoundError("No user with matching ID found");
      }
      res.send({
        name: user.name,
        avatar: user.avatar,
        email: user.email,
        _id: user._id,
      });
    })
    .catch(next);
  // .catch((err) => {
  //   console.error(err);
  //   if (err.name === "ValidationError") {
  //     return res.status(BAD_REQUEST).send({ message: "Invalid data" });
  //   }
  //   if (err.name === "DocumentNotFound") {
  //     return res.status(NOT_FOUND).send({ message: "User does not exist" });
  //   }
  //   return res
  //     .status(SERVER_ISSUE)
  //     .send({ message: "An error has occurred on the server" });
  // });
};
