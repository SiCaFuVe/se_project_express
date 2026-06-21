const router = require("express").Router();
const auth = require("../middlewares/auth");
const { getCurrentUser, updateCurrentUser } = require("../controllers/users");

// router.get("/", getUsers);
router.get("/me", auth, getCurrentUser);
router.patch("/me", auth, updateCurrentUser);
router.use((req, res) => {
  res.status(404).send({ message: "Requested resource not found" });
});

module.exports = router;
