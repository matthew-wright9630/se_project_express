const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  BAD_REQUEST,
  NOT_FOUND,
  SERVER_ISSUE,
  DUPLICATE_USER_ERROR,
  AUTHENTICATION_ERROR,
} = require("../utils/errors");
const JWT_SECRET = require("../utils/config");

// module.exports.getUsers = (req, res) => {
//   User.find({})
//     .then((users) => res.send(users))
//     .catch((err) => {
//       console.error(err);
//       return res
//         .status(SERVER_ISSUE)
//         .send({ message: "An error has occurred on the server" });
//     });
// };

// module.exports.getUserById = (req, res) => {
//   const { userid } = req.params;

//   User.findById(userid)
//     .orFail()
//     .then((user) => res.send(user))
//     .catch((err) => {
//       console.error(err);
//       if (err.name === "DocumentNotFoundError") {
//         return res.status(NOT_FOUND).send({ message: err.message });
//       }
//       if (err.name === "CastError") {
//         return res.status(BAD_REQUEST).send({ message: "Invalid data" });
//       }
//       return res
//         .status(SERVER_ISSUE)
//         .send({ message: "An error has occurred on the server" });
//     });
// };

module.exports.createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (!email) {
        const error = new Error("ValidationError");
        error.name = "ValidationError";
        throw error;
      }
      if (user) {
        const error = new Error("DuplicateUserError");
        error.status = DUPLICATE_USER_ERROR;
        throw error;
      }

      return bcrypt.hash(password, 10);
    })
    .then((hash) =>
      User.create({
        name: name,
        avatar: avatar,
        email: email,
        password: hash,
      })
    )
    .then((user) =>
      res.send({ name: user.name, avatar: user.avatar, email: user.email })
    )
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST).send({ message: "Invalid data" });
      }
      if (err.status === DUPLICATE_USER_ERROR) {
        return res.status(409).send({
          message: "Email address is already taken. Please provide a new email",
        });
      }
      return res
        .status(SERVER_ISSUE)
        .send({ message: "An error has occurred on the server" });
    });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      res.send({
        token: jwt.sign({ _id: user._id }, JWT_SECRET, {
          expiresIn: "7d",
        }),
      });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST).send({ message: "Invalid data" });
      }
      if (err.name === "AuthenticationError") {
        return res
          .status(AUTHENTICATION_ERROR)
          .send({ message: "Incorrect email or password" });
      }
      return res
        .status(SERVER_ISSUE)
        .send({ message: "An error has occurred on the server" });
    });
};

module.exports.getCurrentUser = (req, res) => {
  User.findById(req.user._id)
    .then((user) =>
      res.send({ name: user.name, avatar: user.avatar, email: user.email })
    )
    .catch((err) => {
      console.error(err);
      return res
        .status(SERVER_ISSUE)
        .send({ message: "An error has occurred on the server" });
    });
};

module.exports.updateUser = (req, res) => {
  const { name, avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name: name, avatar: avatar },
    { new: true, runValidators: true }
  )
    .then((user) => {
      if (!user) {
        const error = new Error("User does not exist");
        error.name = "DocumentNotFound";
        throw error;
      }
      res.send({ name: user.name, avatar: user.avatar, email: user.email });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST).send({ message: "Invalid data" });
      }
      if (err.name === "DocumentNotFound") {
        return res.status(NOT_FOUND).send({ message: "User does not exist" });
      }
      return res
        .status(SERVER_ISSUE)
        .send({ message: "An error has occurred on the server" });
    });
};
