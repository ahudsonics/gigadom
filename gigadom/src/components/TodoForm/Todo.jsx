import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Todo = () => {
  const [todos, setTodos] = useState([])
  const [newTask, setNewTask] = useState('')

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

  const handleAddTask = async () => {
    const isJob = window.confirm('Would you like to add a job?')

    if (isJob) {
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

      alert(JSON.stringify(newJob, null, 2))
      setTodos([...todos, newJob])
    } else {
      const newTaskName = prompt('Enter task name:')

      if (!newTaskName) return

      try {
        const res = await axios.post('/api/todo', { taskName: newTaskName })
        setTodos([...todos, res.data])
      } catch (error) {
        console.error('Failed to add task', error)
      }
    }
  }

  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`/api/todo/${id}`)
      setTodos(todos.filter((task) => task._id !== id))
    } catch (error) {
      console.error('Failed to delete task', error)
    }
  }

  return (
    <div>
      <div>
        <h2>Job Management System</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleAddTask()
          }}
        >
          <input
            type="text"
            placeholder="Add a new task or job"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button onClick={handleAddTask}>Add Job</button>
        </form>
      </div>

      <ul>
        {todos.map((task, index) => (
          <li key={index}>
            {task.jobName || task.taskName}
            <button onClick={() => handleDeleteTask(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Todo
