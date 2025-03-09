'use client'
import { useState, useCallback } from 'react'

import style from '../TodoApp/TodoApp.module.css'
import Header from '../Header'
import TodoList from '../TodoList'
import Footer from '../Footer'

export default function TodoApp() {
  const [inputValue, setInputValue] = useState('')
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState('All')

  const handleToggle = useCallback(
    (id) => {
      setTasks((prevTasks) => {
        return prevTasks.map((task) => {
          return task.id === id
            ? {
                ...task,
                completed: !task.completed,
                status: !task.completed ? 'Completed' : 'Active',
              }
            : task
        })
      })
    },
    [setTasks]
  )
  const handleDelete = useCallback(
    (id) => {
      setTasks((prevTasks) => {
        return prevTasks.filter((task) => task.id !== id)
      })
    },
    [setTasks]
  )
  const handleEdit = useCallback(
    (newText, id) => {
      setTasks((prevTasks) => {
        return prevTasks.map((task) => {
          return task.id === id ? { ...task, text: newText } : task
        })
      })
    },
    [setTasks]
  )

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'All') return true
    if (filter === 'Active') return !task.completed
    if (filter === 'Completed') return task.completed
    return true
  })

  return (
    <section className={style.todoapp}>
      <Header inputValue={inputValue} setInputValue={setInputValue} setTask={setTasks} />
      <section className="main">
        <TodoList
          tasks={filteredTasks}
          onToggle={handleToggle}
          onDelete={handleDelete}
          onEdit={handleEdit}
          setTasks={setTasks}
        />
        <Footer tasks={tasks} setTasks={setTasks} setFilter={setFilter} filter={filter} />
      </section>
    </section>
  )
}
