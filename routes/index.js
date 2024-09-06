const router = require("express").Router();

const clothingItemsRouter = require("./clothingItems");
const userRouter = require("./users");

router.use("/users", userRouter);
router.use("/items", clothingItemsRouter);

module.exports = router;