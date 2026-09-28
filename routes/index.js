const router = require("express").Router();
const clothingItemsRouter = require("./clothingItems");
const userRouter = require("./users");
const { createUser, login } = require("../controllers/users");
const {
  validateCreateUser,
  validateLogin,
} = require("../middlewares/validation");
const NotFoundError = require("../utils/errors/NotFoundError");

router.post("/signup", validateCreateUser, createUser);
router.post("/signin", validateLogin, login);
router.use("/items", clothingItemsRouter);
router.use("/users", userRouter);
router.use((req, res) => {
  next(new NotFoundError("Route not found"));
});

module.exports = router;
