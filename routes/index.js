const router = require("express").Router();

const { BAD_REQUEST } = require("../utils/errors");
const clothingItemsRouter = require("./clothingItems");
const userRouter = require("./users");

router.use("/users", userRouter);
router.use("/items", clothingItemsRouter);
router.use((req, res) => {
  res.status(BAD_REQUEST).send({message: "Pathway does not exist"});
})

module.exports = router;