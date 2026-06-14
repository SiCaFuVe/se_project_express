const express = require("express");
const mongoose = require("mongoose");
const mainRouter = require("./routes/index");
const { createUser } = require("./controllers/users");

const app = express();
const { PORT = 3001 } = process.env;
const cors = require("cors");

app.use(express.json());
app.post("/signup", createUser);
app.use("/", mainRouter);
app.use(cors());

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
