const router = require("express").Router();
const { getUsers } = require("../controllers/users");

router.get("/", getUsers);
router.get("/:userId", () => console.log("GET Users by ID"));
router.post("/", () => console.log("POST Users"));

module.exports = router;
``