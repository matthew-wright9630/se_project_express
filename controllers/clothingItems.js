const ClothingItem = require("../models/clothingItem");
const {
  BAD_REQUEST,
  NOT_FOUND,
  SERVER_ISSUE,
  FORBIDDEN_ERROR,
} = require("../utils/errors");

module.exports.getClothingItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.send({ data: items }))
    .catch((err) => {
      console.error(err);
      return res
        .status(SERVER_ISSUE)
        .send({ message: "An error has occurred on the server" });
    });
};

module.exports.createClothingItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => res.send({ data: item }))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST).send({ message: "Invalid data" });
      }
      return res
        .status(SERVER_ISSUE)
        .send({ message: "An error has occurred on the server" });
    });
};

module.exports.deleteClothingItem = (req, res) => {
  const { itemId } = req.params;
  ClothingItem.findByIdAndRemove(itemId)
    .orFail()
    .then((item) => {
      if (!item.owner.equals(req.user._id)) {
        const error = new Error("You do not have permission for this action");
        error.name = "ForbiddenError";
        throw error;
      }
      res.send({ data: item });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).send({ message: "Item not found" });
      }
      if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: "Invalid data" });
      }
      if (err.name === "ForbiddenError") {
        return res
          .status(FORBIDDEN_ERROR)
          .send({ message: "You do not have permission for this action" });
      }
      return res
        .status(SERVER_ISSUE)
        .send({ message: "An error has occurred on the server" });
    });
};

module.exports.likeClothingItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.params.itemId } },
    { new: true }
  )
    .orFail()
    .then((item) => res.send({ data: item }))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).send({ message: "Item not found" });
      }
      if (err.name === "CastError" || err.name === "ValidationError") {
        return res.status(BAD_REQUEST).send({ message: "Invalid Data" });
      }
      return res
        .status(SERVER_ISSUE)
        .send({ message: "An error has occurred on the server" });
    });
};

module.exports.dislikeClothingItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.params.itemId } },
    { new: true }
  )
    .orFail()
    .then((item) => res.send({ data: item }))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).send({ message: "Item not found" });
      }
      if (err.name === "CastError" || err.name === "ValidationError") {
        return res.status(BAD_REQUEST).send({ message: "Invalid Data" });
      }
      return res
        .status(SERVER_ISSUE)
        .send({ message: "An error has occurred on the server" });
    });
};
