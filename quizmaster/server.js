
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(process.env.MONGO_URI);

// Models
const Topic = require("./models/Topic");
const Question = require("./models/Question");
const Result = require("./models/Result");

// APIs
app.get("/api/topics", async (req, res) => {
  const data = await Topic.find();
  res.json(data);
});

app.post("/api/topics", async (req, res) => {
  const t = new Topic(req.body);
  await t.save();
  res.json(t);
});

app.get("/api/questions/:topicId", async (req, res) => {
  const data = await Question.find({ topicId: req.params.topicId });
  res.json(data);
});

app.post("/api/questions", async (req, res) => {
  const q = new Question(req.body);
  await q.save();
  res.json(q);
});

app.delete("/api/questions/:id", async (req, res) => {
  await Question.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

app.post("/api/results", async (req, res) => {
  const r = new Result(req.body);
  await r.save();
  res.json(r);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running..."));
