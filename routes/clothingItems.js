const router = require("express").Router();
const auth = require("../middlewares/auth");
const {
  validateCreateClothingItem,
  validateIdParam,
  validateQueryFilters,
} = require("../middlewares/validation");

const {
  getClothingItems,
  createClothingItem,
  deleteClothingItem,
  likeClothingItem,
  unlikeClothingItem,
} = require("../controllers/clothingItems");

router.get("/", validateQueryFilters, getClothingItems);
router.use(auth);

// Create a new clothing item POST
router.post("/", validateCreateClothingItem, createClothingItem);

// Delete a clothing item DELETE
router.delete("/:itemId", validateIdParam("itemId"), deleteClothingItem);

// Like a clothing item
router.put("/:itemId/likes", validateIdParam("itemId"), likeClothingItem);

// Unlike a clothing item
router.delete("/:itemId/likes", validateIdParam("itemId"), unlikeClothingItem);

module.exports = router;
