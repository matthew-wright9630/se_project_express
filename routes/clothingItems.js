const clothingItemsRouter = require("express").Router();
const {
  getClothingItems,
  createClothingItem,
  deleteClothingItem,
  likeClothingItem,
  dislikeClothingItem,
} = require("../controllers/clothingItems");
const auth = require("../middlewares/auth");
const { validateCardCreation, validateItemId } = require("../middlewares/validation");

clothingItemsRouter.get("/", getClothingItems);
clothingItemsRouter.post("/", auth, validateCardCreation, createClothingItem);
clothingItemsRouter.put("/:itemId/likes", auth, validateItemId, likeClothingItem);
clothingItemsRouter.delete("/:itemId/likes", auth, validateItemId, dislikeClothingItem);
clothingItemsRouter.delete("/:itemId", auth, validateItemId, deleteClothingItem);

module.exports = clothingItemsRouter;
