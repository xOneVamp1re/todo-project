import React, { useState, useMemo, useCallback } from 'react'

import footer from './Footer.module.css'

export default function Footer({ tasks, setTasks, setFilter, filter }) {
  const [filterOptions] = useState([
    { id: 1, name: 'All' },
    { id: 2, name: 'Active' },
    { id: 3, name: 'Completed' },
  ])

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter)
  }

  const countRemainingTask = useMemo(() => {
    return tasks.filter((task) => !task.completed).length
  }, [tasks])

  const deleteCompletedTask = useCallback(() => {
    return setTasks((prevTasks) => {
      return prevTasks.filter((task) => !task.completed)
    })
  }, [tasks])

  return (
    <footer className={footer.footer}>
      <span className={footer['todo-count']}>{countRemainingTask} items left</span>
      <ul className="filters">
        {filterOptions.map((option) => (
          <li
            key={option.id}
            onClick={() => {
              handleFilterChange(option.name)
            }}
          >
            <button className={filter === option.name ? 'selected' : ''}>{option.name}</button>
          </li>
        ))}
      </ul>
      <button className="clear-completed" onClick={deleteCompletedTask}>
        Clear completed
      </button>
    </footer>
  )
}
