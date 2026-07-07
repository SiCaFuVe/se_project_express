const router = require("express").Router();
const auth = require("../middlewares/auth");
const { getCurrentUser, updateCurrentUser } = require("../controllers/users");
const { NOT_FOUND_STATUS_CODE } = require("../utils/errors");

// router.get("/", getUsers);
router.get("/me", auth, getCurrentUser);
router.patch("/me", auth, updateCurrentUser);
router.use((req, res) => {
  res
    .status(NOT_FOUND_STATUS_CODE)
    .send({ message: "Requested resource not found" });
});

module.exports = router;
