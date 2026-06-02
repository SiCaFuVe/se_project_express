const router = require("express").Router();

const {
  getClothingItems,
  createClothingItem,
  deleteClothingItem,
  likeClothingItem,
  unlikeClothingItem,
} = require("../controllers/clothingItems");

router.get("/", getClothingItems);

// Create a new clothing item GET
router.post("/", createClothingItem);

// Delete a clothing item DELETE
router.delete("/:itemId", deleteClothingItem);

// Like a clothing item
router.put("/:itemId/likes", likeClothingItem);

// Unlike a clothing item
router.delete("/:itemId/likes", unlikeClothingItem);

module.exports = router;
