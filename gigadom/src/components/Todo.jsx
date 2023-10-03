// src/components/Todo.jsx

import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Todo = () => {
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState('')

  useEffect(() => {
    // Fetch todos from the server
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

  return (
    <div>
      <h2>Todo List</h2>
      <form onSubmit={handleAddTodo}>
        <input
          type="text"
          placeholder="Add a new task"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            {todo.jobName}{' '}
            <button onClick={() => handleDeleteTodo(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Todo
