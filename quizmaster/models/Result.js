
const mongoose = require("mongoose");
module.exports = mongoose.model("Result", {
  score: Number,
  total: Number,
  createdAt: { type: Date, default: Date.now }
});
