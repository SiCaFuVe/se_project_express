const ClothingItem = require("../models/clothingItem");
const {
  INTERNAL_SERVER_ERROR_STATUS_CODE,
  BAD_REQUEST_STATUS_CODE,
  NOT_FOUND_STATUS_CODE,
  FORBIDDEN_STATUS_CODE,
  BadRequestError,
  NotFoundError,
  ForbiddenError,
} = require("../utils/errors");

const getClothingItems = (req, res, next) => {
  ClothingItem.find({})
    .then((items) => res.send({ data: items }))
    .catch((err) => {
      console.error(err);
      return next(err);
    });
};

const createClothingItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => {
      res.status(201).send({ data: item });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return next(new BadRequestError("Invalid data provided"));
      }
      return next(err);
    });
};

const deleteClothingItem = (req, res, next) => {
  const { itemId } = req.params;
  const currentUserId = req.user._id.toString();

  ClothingItem.findById(itemId)
    .orFail()
    .then((item) => {
      if (item.owner.toString() !== currentUserId) {
        return next(new ForbiddenError("Forbidden"));
      }

      return item.deleteOne().then(() => res.send({ data: item }));
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError("Clothing item not found"));
      }
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid item ID format"));
      }
      return next(err);
    });
};

const likeClothingItem = (req, res, next) => {
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
        return next(new NotFoundError("Clothing item not found"));
      }
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid item ID format"));
      }
      return next(err);
    });
};

const unlikeClothingItem = (req, res, next) => {
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
        return next(new NotFoundError("Clothing item not found"));
      }
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid item ID format"));
      }
      return next(err);
    });
};

module.exports = {
  getClothingItems,
  createClothingItem,
  deleteClothingItem,
  likeClothingItem,
  unlikeClothingItem,
};
