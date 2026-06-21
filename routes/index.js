const router = require("express").Router();
const clothingItemsRouter = require("./clothingItems");
const userRouter = require("./users");
const { createUser, login } = require("../controllers/users");
const { NOT_FOUND_STATUS_CODE } = require("../utils/errors");

router.post("/signup", createUser);
router.post("/login", login);
router.use("/items", clothingItemsRouter);
router.use("/users", userRouter);
router.use((req, res) => {
  res.status(NOT_FOUND_STATUS_CODE).send({ message: "Route not found" });
});

module.exports = router;
