// routes/api/todo.js

const express = require('express')
const router = express.Router()
const Todo = require('../../models/Todo')

// @route   GET /api/todo
// @desc    Get all todos
// @access  Public
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find()
    res.json(todos)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error')
  }
})

// @route   POST /api/todo
// @desc    Create a new todo
// @access  Public
router.post('/', async (req, res) => {
  try {
    const newTodo = new Todo({
      jobName: req.body.jobName,
      jobType: req.body.jobType,
      jobDescription: req.body.jobDescription,
      dateLength: req.body.dateLength,
      companyClient: req.body.companyClient,
      hoursSpent: req.body.hoursSpent,
      budgetSpent: req.body.budgetSpent,
      paidPerHourFinal: req.body.paidPerHourFinal,
      notes: req.body.notes
    })

    const todo = await newTodo.save()
    res.json(todo)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error')
  }
})

// ... Implement other CRUD operations as needed ...

module.exports = router
