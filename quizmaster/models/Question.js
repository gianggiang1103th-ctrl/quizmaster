
const mongoose = require("mongoose");
module.exports = mongoose.model("Question", {
  topicId: String,
  question: String,
  options: [String],
  answer: String
});
