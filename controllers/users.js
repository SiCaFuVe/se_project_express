const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const {
  USER_NOT_FOUND,
  BadRequestError,
  ConflictError,
  NotFoundError,
  UnauthorizedError,
} = require("../utils/errors");
const { JWT_SECRET } = require("../utils/config");

// POST /users

const createUser = (req, res, next) => {
  const { name, avatar, email, password } = req.body;
  if (!password) {
    return next(new BadRequestError("Password is required"));
  }

  return bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ name, avatar, email, password: hash }))
    .then((user) => {
      const userObj = user.toObject();
      delete userObj.password;
      return res.status(201).send({ data: userObj });
    })
    .catch((err) => {
      console.error(err);
      if (err.code === 11000) {
        return next(new ConflictError("User already exists"));
      }
      if (err.name === "ValidationError") {
        return next(new BadRequestError("Invalid data"));
      }
      return next(err);
    });
};

const getCurrentUser = (req, res, next) => {
  const { _id: userId } = req.user;
  User.findById(userId)
    .orFail()
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError(USER_NOT_FOUND));
      }
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid data"));
      }
      return next(err);
    });
};

const updateCurrentUser = (req, res, next) => {
  const { name, avatar } = req.body;
  const { _id: userId } = req.user;

  User.findByIdAndUpdate(
    userId,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .orFail()
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError(USER_NOT_FOUND));
      }
      if (err.name === "ValidationError") {
        return next(new BadRequestError("Invalid data"));
      }
      return next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });

      res.send({ token });
    })
    .catch((err) => {
      console.error(err);
      if (err.message === "Invalid email or password") {
        return next(new UnauthorizedError("Invalid email or password"));
      }
      return next(err);
    });
};

module.exports = {
  createUser,
  getCurrentUser,
  updateCurrentUser,
  login,
};
