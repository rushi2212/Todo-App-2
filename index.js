const express = require("express");
const app = express();
const dotenv = require("dotenv");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
const port = process.env.PORT || 3000;

let items = [];
let nextId = 1;

app.get("/", function (req, res) {
  const priority = req.query.priority || "All";
  const filtered =
    priority === "All"
      ? items
      : items.filter((item) => item.priority === priority);
  res.render("list", { ejes: filtered, selectedPriority: priority });
});

app.post("/add", function (req, res) {
  const { ele1, priority } = req.body;
  if (ele1) {
    items.push({
      id: nextId++,
      text: ele1,
      priority,
      completed: false,
    });
  }
  res.redirect("/");
});

app.post("/edit", function (req, res) {
  const { taskId, taskText } = req.body;
  const id = parseInt(taskId);
  const task = items.find((item) => item.id === id);
  if (task && taskText) {
    task.text = taskText;
  }
  res.redirect("/");
});

app.post("/toggle", function (req, res) {
  const id = parseInt(req.body.taskId);
  const task = items.find((item) => item.id === id);
  if (task) task.completed = !task.completed;
  res.redirect("/");
});

app.post("/delete", function (req, res) {
  const id = parseInt(req.body.taskId);
  items = items.filter((item) => item.id !== id);
  res.redirect("/");
});

app.listen(port, function () {
  console.log("Server running on port " + port);
});
