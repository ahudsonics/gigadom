// models/todo.js

const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  jobName: {
    type: String,
    required: true
  },
  jobType: String,
  jobDescription: String,
  dateLength: Number,
  companyClient: String,
  hoursSpent: Number,
  budgetSpent: Number,
  paidPerHourFinal: Number,
  notes: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' // Reference to the User model
  }
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
