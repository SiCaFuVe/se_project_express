const router = require("express").Router();
const auth = require("../middlewares/auth");

const {
  getClothingItems,
  createClothingItem,
  deleteClothingItem,
  likeClothingItem,
  unlikeClothingItem,
} = require("../controllers/clothingItems");

router.get("/", getClothingItems);
router.use(auth);

// Create a new clothing item POST
router.post("/", createClothingItem);

// Delete a clothing item DELETE
router.delete("/:itemId", deleteClothingItem);

// Like a clothing item
router.put("/:itemId/likes", likeClothingItem);

// Unlike a clothing item
router.delete("/:itemId/likes", unlikeClothingItem);

module.exports = router;
