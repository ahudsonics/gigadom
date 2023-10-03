// src/components/Todo.jsx

import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Todo = () => {
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState('')

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await axios.get('/api/todo')
        setTodos(res.data)
      } catch (error) {
        console.error('Failed to fetch todos', error)
      }
    }

    fetchTodos()
  }, [])

  const handleAddTodo = async (e) => {
    e.preventDefault()
    if (!newTodo) return

    try {
      const res = await axios.post('/api/todo', { jobName: newTodo })
      setTodos([...todos, res.data])
      setNewTodo('')
    } catch (error) {
      console.error('Failed to add todo', error)
    }
  }

  const handleDeleteTodo = async (id) => {
    try {
      await axios.delete(`/api/todo/${id}`)
      setTodos(todos.filter((todo) => todo._id !== id))
    } catch (error) {
      console.error('Failed to delete todo', error)
    }
  }

  const addJob = () => {
    const jobName = prompt('Enter job name:')
    const jobType = prompt('Enter job type:')
    const jobDescription = prompt('Enter job description:')
    const projectLength = parseInt(prompt('Enter project length in days:'))
    const companyClient = prompt('Enter company or client:')
    const hoursSpent = parseFloat(prompt('Enter hours spent:'))
    const hoursExpected = parseFloat(prompt('Enter hours expected:'))
    const budgetSpent = parseFloat(prompt('Enter budget spent:'))
    const budgetExpected = parseFloat(prompt('Enter budget expected:'))
    const paidPerHourExpected = (budgetExpected / hoursExpected).toFixed(2)
    const paidPerHourFinal = (budgetSpent / hoursSpent).toFixed(2)
    const notes = prompt('Enter day-to-day notes (separated by commas):').split(',')

    const newJob = {
      jobName,
      jobType,
      jobDescription,
      projectLength,
      companyClient,
      hoursSpent,
      hoursExpected,
      budgetSpent,
      budgetExpected,
      paidPerHourExpected,
      paidPerHourFinal,
      notes
    }

    // Display all details of the todo card
    alert(JSON.stringify(newJob, null, 2))

    setTodos([...todos, newJob])
  }

  return (
    <div>
      <h2>Job Management System </h2>
      <form onSubmit={handleAddTodo}>
        <input
          type="text"
          placeholder="Add a new task"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
      <button onClick={addJob}>Add Job</button>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {todo.jobName} <button onClick={() => handleDeleteTodo(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Todo
