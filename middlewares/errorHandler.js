// Centralized error-handling middleware
module.exports = (err, req, res, next) => {
  console.error(err);

  const { statusCode = 500, message } = err;

  if (statusCode === 500) {
    return res.status(500).send({ message: "An error occurred on the server" });
  }

  return res.status(statusCode).send({ message: message || "Error" });
};
