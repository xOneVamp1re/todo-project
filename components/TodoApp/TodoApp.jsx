'use client'
import { useState, useCallback, useEffect } from 'react'

import style from '../TodoApp/TodoApp.module.css'
import Header from '../Header'
import TodoList from '../TodoList'
import Footer from '../Footer'

export default function TodoApp() {
  const [inputValue, setInputValue] = useState('')
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState('All')
  const [timers, setTimers] = useState({})

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
      setTimers((prevTimers) => {
        const newTimers = { ...prevTimers }
        delete newTimers[id]
        return newTimers
      })
    },
    [setTasks, setTimers]
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

  const activeTimersUpdate = (id) => {
    setTimers((prevTimers) => {
      const { duration } = prevTimers[id]
      if (duration > 0) {
        return { ...prevTimers, [id]: { duration: duration - 1, active: true } }
      }
    })
  }
  const findActiveTimers = () => {
    for (const id in timers) {
      if (timers[id].active) {
        activeTimersUpdate(id)
      }
    }
  }

  useEffect(() => {
    const interval = setInterval(findActiveTimers, 1000)
    return () => clearInterval(interval)
  }, [timers])

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'All') return true
    if (filter === 'Active') return !task.completed
    if (filter === 'Completed') return task.completed
    return true
  })

  return (
    <section className={style.todoapp}>
      <Header inputValue={inputValue} setInputValue={setInputValue} setTask={setTasks} setTimers={setTimers} />
      <section className="main">
        <TodoList
          tasks={filteredTasks}
          onToggle={handleToggle}
          onDelete={handleDelete}
          onEdit={handleEdit}
          setTasks={setTasks}
          setTimers={setTimers}
          timers={timers}
        />
        <Footer tasks={tasks} setTasks={setTasks} setFilter={setFilter} filter={filter} />
      </section>
    </section>
  )
}
