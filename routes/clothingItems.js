const clothingItemsRouter = require("express").Router();
const {
  getClothingItems,
  createClothingItem,
  deleteClothingItem,
  likeClothingItem,
  dislikeClothingItem,
} = require("../controllers/clothingItems");
const auth = require("../middlewares/auth");

clothingItemsRouter.get("/", getClothingItems);
clothingItemsRouter.post("/", auth, createClothingItem);
clothingItemsRouter.put("/:itemId/likes", auth, likeClothingItem);
clothingItemsRouter.delete("/:itemId/likes", auth, dislikeClothingItem);
clothingItemsRouter.delete("/:itemId", auth, deleteClothingItem);

module.exports = clothingItemsRouter;
