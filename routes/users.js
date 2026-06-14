const router = require("express").Router();
const auth = require("../middlewares/auth");
const {
  getCurrentUser,
  updateCurrentUser,
  login,
} = require("../controllers/users");

// router.get("/", getUsers);
router.get("/me", auth, getCurrentUser);
router.patch("/me", auth, updateCurrentUser);
// router.post("/", createUser);
router.post("/login", login);
router.use((req, res) => {
  res.status(404).send({ message: "Requested resource not found" });
});

module.exports = router;
