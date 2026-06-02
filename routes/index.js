const router = require("express").Router();
const clothingItemsRouter = require("./clothingItems");
const userRouter = require("./users");

router.use("/items", clothingItemsRouter);
router.use("/users", userRouter);
router.use((req, res) => {
  res.status(NOT_FOUND_STATUS_CODE).send({ message: "Route not found" });
});

module.exports = router;
