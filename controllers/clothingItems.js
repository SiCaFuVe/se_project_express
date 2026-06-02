const ClothingItem = require("../models/clothingItem");
const {
  BAD_REQUEST_STATUS_CODE,
  NOT_FOUND_STATUS_CODE,
  INTERNAL_SERVER_ERROR_STATUS_CODE,
} = require("../utils/errors");

const getClothingItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.send({ data: items }))
    .catch((err) => {
      console.error(err);
      res
        .status(INTERNAL_SERVER_ERROR_STATUS_CODE)
        .send({ message: "Server error" });
    });
};

const createClothingItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => {
      res.status(201).send({ data: item });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        res
          .status(BAD_REQUEST_STATUS_CODE)
          .send({ message: "Invalid data provided" });
      } else {
        res
          .status(INTERNAL_SERVER_ERROR_STATUS_CODE)
          .send({ message: "Server error" });
      }
    });
};

const deleteClothingItem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndDelete(itemId)
    .orFail()
    .then((item) => res.send({ data: item }))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        res
          .status(NOT_FOUND_STATUS_CODE)
          .send({ message: "Clothing item not found" });
      } else if (err.name === "CastError") {
        res
          .status(BAD_REQUEST_STATUS_CODE)
          .send({ message: "Invalid item ID format" });
      } else {
        res
          .status(INTERNAL_SERVER_ERROR_STATUS_CODE)
          .send({ message: "Server error" });
      }
    });
};

const likeClothingItem = (req, res) => {
  const { itemId } = req.params;
  const userId = req.user._id;

  ClothingItem.findByIdAndUpdate(
    itemId,
    { $addToSet: { likes: userId } },
    { new: true, runValidators: true }
  )
    .orFail()
    .then((item) => res.send({ data: item }))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        res
          .status(NOT_FOUND_STATUS_CODE)
          .send({ message: "Clothing item not found" });
      } else if (err.name === "CastError") {
        res
          .status(BAD_REQUEST_STATUS_CODE)
          .send({ message: "Invalid item ID format" });
      } else {
        res
          .status(INTERNAL_SERVER_ERROR_STATUS_CODE)
          .send({ message: "Server error" });
      }
    });
};

const unlikeClothingItem = (req, res) => {
  const { itemId } = req.params;
  const userId = req.user._id;

  ClothingItem.findByIdAndUpdate(
    itemId,
    { $pull: { likes: userId } },
    { new: true, runValidators: true }
  )
    .orFail()
    .then((item) => res.send({ data: item }))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        res
          .status(NOT_FOUND_STATUS_CODE)
          .send({ message: "Clothing item not found" });
      } else if (err.name === "CastError") {
        res
          .status(BAD_REQUEST_STATUS_CODE)
          .send({ message: "Invalid item ID format" });
      } else {
        res
          .status(INTERNAL_SERVER_ERROR_STATUS_CODE)
          .send({ message: "Server error" });
      }
    });
};

module.exports = {
  getClothingItems,
  createClothingItem,
  deleteClothingItem,
  likeClothingItem,
  unlikeClothingItem,
};
