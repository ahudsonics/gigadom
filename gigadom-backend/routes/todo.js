// routes/todo.js

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const Todo = require('../models/Todo');

// @route   GET /api/todo
// @desc    Get all todos
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user.id });
    res.json(todos);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST /api/todo
// @desc    Add a new todo
// @access  Private
router.post('/', auth, async (req, res) => {
  const { jobName, jobType, jobDescription, dateLength, companyClient } = req.body;

  try {
    const newTodo = new Todo({
      jobName,
      jobType,
      jobDescription,
      dateLength,
      companyClient,
      user: req.user.id,
    });

    const todo = await newTodo.save();
    res.json(todo);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/todo/:id
// @desc    Get a specific todo
// @access  Private
router.get('/:id', auth, async (req, res) => {
    try {
      const todo = await Todo.findById(req.params.id);
  
      if (!todo) {
        return res.status(404).json({ msg: 'Todo not found' });
      }
  
      // Ensure the authenticated user owns this todo
      if (todo.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'Not authorized' });
      }
  
      res.json(todo);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });
  
  // @route   PUT /api/todo/:id
  // @desc    Update a todo
  // @access  Private
  router.put('/:id', auth, async (req, res) => {
    const { jobName, jobType, jobDescription, dateLength, companyClient } = req.body;
  
    const todoFields = {};
    if (jobName) todoFields.jobName = jobName;
    if (jobType) todoFields.jobType = jobType;
    if (jobDescription) todoFields.jobDescription = jobDescription;
    if (dateLength) todoFields.dateLength = dateLength;
    if (companyClient) todoFields.companyClient = companyClient;
  
    try {
      let todo = await Todo.findById(req.params.id);
  
      if (!todo) {
        return res.status(404).json({ msg: 'Todo not found' });
      }
  
      // Ensure the authenticated user owns this todo
      if (todo.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'Not authorized' });
      }
  
      todo = await Todo.findByIdAndUpdate(
        req.params.id,
        { $set: todoFields },
        { new: true }
      );
  
      res.json(todo);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });
  
  // @route   DELETE /api/todo/:id
  // @desc    Delete a todo
  // @access  Private
  router.delete('/:id', auth, async (req, res) => {
    try {
      let todo = await Todo.findById(req.params.id);
  
      if (!todo) {
        return res.status(404).json({ msg: 'Todo not found' });
      }
  
      // Ensure the authenticated user owns this todo
      if (todo.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'Not authorized' });
      }
  
      await Todo.findByIdAndRemove(req.params.id);
  
      res.json({ msg: 'Todo removed' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });
  

module.exports = router;
