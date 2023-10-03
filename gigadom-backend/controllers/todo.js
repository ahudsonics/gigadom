// controllers/todo.js

const Todo = require('../models/Todo');

const getTodoById = async (req, res) => {
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
};

const updateTodo = async (req, res) => {
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
};

const deleteTodo = async (req, res) => {
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
};

module.exports = {
  getTodos,
  addTodo,
  getTodoById,
  updateTodo,
  deleteTodo,
};
