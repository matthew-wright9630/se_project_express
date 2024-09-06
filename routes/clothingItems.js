const clothingItemsRouter = require("express").Router();
const {
  getClothingItems,
  createClothingItem,
  deleteClothingItem,
  likeClothingItem,
  dislikeClothingItem,
} = require("../controllers/clothingItems");

clothingItemsRouter.get("/", getClothingItems);
clothingItemsRouter.post("/", createClothingItem);
clothingItemsRouter.delete("/:itemId", deleteClothingItem);
clothingItemsRouter.put("/:itemId/likes", likeClothingItem);
clothingItemsRouter.delete("/:itemId/likes", dislikeClothingItem);

module.exports = clothingItemsRouter;
