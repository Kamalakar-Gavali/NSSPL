const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  taskTitle: String,
  taskDesc: String,
  createdBy: String,
  createdAt: Date,
  assignedTo: String,
  status: String,
});
module.exports = TaskModel = mongoose.model("task", taskSchema);
