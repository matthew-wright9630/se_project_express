const router = require("express").Router();

const { NOT_FOUND } = require("../utils/errors");
const clothingItemsRouter = require("./clothingItems");
const userRouter = require("./users");

router.use("/", userRouter);
router.use("/items", clothingItemsRouter);

router.use((req, res) => {
  res.status(NOT_FOUND).send({ message: "Pathway does not exist" });
});

module.exports = router;
