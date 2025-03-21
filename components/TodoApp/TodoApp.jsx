'use client'
import { useState, useCallback, useRef } from 'react'

import style from '../TodoApp/TodoApp.module.css'
import Header from '../Header'
import TodoList from '../TodoList'
import Footer from '../Footer'

export default function TodoApp() {
  const [inputValue, setInputValue] = useState('')
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState('All')
  const [timers, setTimers] = useState({})
  const timersRef = useRef({})

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
      if (timersRef.current[id]) {
        clearInterval(timersRef.current[id])
        delete timersRef.current[id]
      }
      setTimers((prev) => {
        delete prev[id]
        return prev
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

  const startTimer = useCallback((id, duration) => {
    if (timersRef.current[id]) {
      clearInterval(timersRef.current[id])
    }

    timersRef.current[id] = setInterval(() => {
      setTimers((prevTimers) => {
        const currentDuration = prevTimers[id]?.duration || duration
        if (currentDuration > 0) {
          return { ...prevTimers, [id]: { duration: currentDuration - 1, active: true } }
        } else {
          clearInterval(timersRef.current[id])
          delete timersRef.current[id]
          return { ...prevTimers, [id]: { duration: 0, active: false } }
        }
      })
    }, 1000)
  }, [])

  const stopTimer = useCallback((id) => {
    if (timersRef.current[id]) {
      clearInterval(timersRef.current[id])
      delete timersRef.current[id]
    }
    setTimers((prevTimers) => {
      return { ...prevTimers, [id]: { ...prevTimers[id], active: false } }
    })
  }, [])

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
          timers={timers}
          startTimer={startTimer}
          stopTimer={stopTimer}
        />
        <Footer
          tasks={tasks}
          setTasks={setTasks}
          setFilter={setFilter}
          filter={filter}
          setTimers={setTimers}
          timersRef={timersRef}
        />
      </section>
    </section>
  )
}
