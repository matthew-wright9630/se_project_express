const User = require("../models/user");
const {
  BAD_REQUEST,
  ENTRY_NOT_FOUND,
  SERVER_ISSUE,
} = require("../utils/errors");

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(ENTRY_NOT_FOUND).send({ message: err.message });
      }
      if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: err.message });
      }
      return res.status(SERVER_ISSUE).send({ message: err.message });
    });
};

module.exports.getUserById = (req, res) => {
  const { userid } = req.params;

  User.findById(userid)
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(ENTRY_NOT_FOUND).send({ message: err.message });
      }
      if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: err.message });
      }
      return res.status(SERVER_ISSUE).send({ message: err.message });
    });
};

module.exports.createUser = (req, res) => {
  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      console.error(err.name);
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(ENTRY_NOT_FOUND).send({ message: err.message });
      }
      if (err.name === "CastError" || err.name === "ValidationError") {
        return res.status(BAD_REQUEST).send({ message: err.message });
      }
      return res.status(SERVER_ISSUE).send({ message: err.message });
    });
};
