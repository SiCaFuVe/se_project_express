const mongoose = require("mongoose");

const clothingItemSchema = new mongoose.Schema({});

const User = mongoose.model("item", clothingItemSchema);
