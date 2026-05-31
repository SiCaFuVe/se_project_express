const router = require("express").Router();
const clothingItemsRouter = require("./clothingItems");
const userRouter = require("./users");

router.use("/items", clothingItemsRouter);
router.use("/users", userRouter);
router.use((req, res) => {
  res.status(404).send({ message: "Route not found" });
});

module.exports = router;
