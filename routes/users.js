const router = require("express").Router();
const auth = require("../middlewares/auth");
const { getCurrentUser, updateCurrentUser } = require("../controllers/users");
const {
  validateAuthHeader,
  validateUpdateUser,
} = require("../middlewares/validation");

// router.get("/", getUsers);
router.get("/me", validateAuthHeader, auth, getCurrentUser);
router.patch(
  "/me",
  validateAuthHeader,
  auth,
  validateUpdateUser,
  updateCurrentUser
);
// 404 handled centrally in routes/index.js

module.exports = router;
