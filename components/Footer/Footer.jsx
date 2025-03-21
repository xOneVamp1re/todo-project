import React, { useState, useMemo, useCallback } from 'react'
import PropTypes from 'prop-types'

import footer from './Footer.module.css'

function Footer({ tasks, setTasks, setFilter, filter, setTimers, timersRef }) {
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
    const completedTasks = tasks.filter((task) => task.completed)
    setTasks((prevTasks) => prevTasks.filter((task) => !task.completed))

    completedTasks.forEach((task) => {
      if (timersRef.current[task.id]) {
        clearInterval(timersRef.current[task.id])
        delete timersRef.current[task.id]
      }
    })

    setTimers((prevTimers) => {
      const newTimers = { ...prevTimers }
      completedTasks.forEach((task) => {
        delete newTimers[task.id]
      })
      return newTimers
    })
  }, [setTasks, setTimers, tasks, timersRef])

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
            role="presentation">
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
Footer.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
      status: PropTypes.string.isRequired,
      createAt: PropTypes.instanceOf(Date).isRequired,
    })
  ).isRequired,
  setTasks: PropTypes.func.isRequired,
  setFilter: PropTypes.func.isRequired,
  filter: PropTypes.string,
  setTimers: PropTypes.func.isRequired,
  timersRef: PropTypes.object,
}

export default Footer
