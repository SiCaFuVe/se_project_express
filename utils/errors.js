const BAD_REQUEST_STATUS_CODE = 400;
const NOT_FOUND_STATUS_CODE = 404;
const CONNFLICT_STATUS_CODE = 409;
const INTERNAL_SERVER_ERROR_STATUS_CODE = 500;
const FORBIDDEN_STATUS_CODE = 403;
const UNAUTHORIZED_STATUS_CODE = 401;
const USER_NOT_FOUND = "User not found";
const INVALID_USER_ID_FORMAT = "Invalid user ID format";
const INVALID_URL = "You must enter a valid URL";

class BadRequestError extends Error {
  constructor(message = 'Bad request') {
    super(message);
    this.statusCode = BAD_REQUEST_STATUS_CODE;
  }
}

class UnauthorizedError extends Error {
  constructor(message = 'Unauthorized') {
    super(message);
    this.statusCode = UNAUTHORIZED_STATUS_CODE;
  }
}

class ForbiddenError extends Error {
  constructor(message = 'Forbidden') {
    super(message);
    this.statusCode = FORBIDDEN_STATUS_CODE;
  }
}

class NotFoundError extends Error {
  constructor(message = 'Not found') {
    super(message);
    this.statusCode = NOT_FOUND_STATUS_CODE;
  }
}

class ConflictError extends Error {
  constructor(message = 'Conflict') {
    super(message);
    this.statusCode = CONNFLICT_STATUS_CODE;
  }
}

module.exports = {
  BAD_REQUEST_STATUS_CODE,
  NOT_FOUND_STATUS_CODE,
  CONNFLICT_STATUS_CODE,
  UNAUTHORIZED_STATUS_CODE,
  INTERNAL_SERVER_ERROR_STATUS_CODE,
  FORBIDDEN_STATUS_CODE,
  USER_NOT_FOUND,
  INVALID_USER_ID_FORMAT,
  INVALID_URL,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
};
