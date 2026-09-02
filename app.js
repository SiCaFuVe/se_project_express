const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const mainRouter = require("./routes/index");
const errorHandler = require("./middlewares/error-handler");
const { errors } = require("celebrate");
const { requestLogger, errorLogger } = require("./middlewares/loggers");

const app = express();
const { PORT = 3001 } = process.env;

app.use(express.json());
app.use(cors());

// Request logger should run before route handlers
app.use(requestLogger);

app.use("/", mainRouter);

// Error logger should run after routes and before error handlers
app.use(errorLogger);

// Celebrate validation errors handler (should be registered before the centralized error handler)
app.use(errors());

// Centralized error handler (should be after other app.use calls)
app.use(errorHandler);

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
