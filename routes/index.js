const router = require("express").Router();

const NotFoundError = require("../errors/not-found-error");
const clothingItemsRouter = require("./clothingItems");
const userRouter = require("./users");

router.use("/", userRouter);
router.use("/items", clothingItemsRouter);

router.use((req, res) => {
  throw new NotFoundError("Pathway does not exist");
});

module.exports = router;
