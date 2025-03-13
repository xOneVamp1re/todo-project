import { useState } from 'react'
import PropTypes from 'prop-types'

import header from './Header.module.css'

function Header({ inputValue, setInputValue, setTask, setTimers }) {
  const [minutes, setMinutes] = useState('')
  const [seconds, setSeconds] = useState('')

  const handleInputChange = (event) => {
    event.preventDefault()
    setInputValue(event.target.value)
  }
  const handleMinutesChange = (value) => {
    const newMinutes = value
    if (newMinutes.match(/^\d{0,2}$/) && (newMinutes === '' || parseInt(newMinutes) < 60)) {
      setMinutes(newMinutes)
    }
  }

  const handleSecondsChange = (value) => {
    const newSeconds = value
    if (newSeconds.match(/^\d{0,2}$/) && (newSeconds === '' || parseInt(newSeconds) < 60)) {
      setSeconds(newSeconds)
    }
  }

  const handleInputSubmit = (event) => {
    event.preventDefault()
    if (!inputValue.trim()) {
      setInputValue('')
      return
    }

    const newTask = {
      id: Date.now(),
      text: inputValue.trim(),
      completed: false,
      status: 'Active',
      createAt: new Date(),
    }
    setTask((prevTask) => {
      return [...prevTask, newTask]
    })
    setTimers((prevTimers) => {
      return { ...prevTimers, [newTask.id]: { duration: convertToSeconds(`${minutes}:${seconds}`), active: false } }
    })
    setInputValue('')
    setMinutes('')
    setSeconds('')
  }

  const convertToSeconds = (time) => {
    if (time.length > 1) {
      const timeParts = time.toString().split(':')
      const minutes = parseInt(timeParts[0], 10)
      const seconds = parseInt(timeParts[1], 10) || 0
      return minutes ? minutes * 60 + seconds : seconds
    }
    return 60
  }

  return (
    <header className={header.header}>
      <h1 className={header.title}>Todo List</h1>
      <form onSubmit={handleInputSubmit} className={`${header.form}`}>
        <input
          className={`${header.input} ${header.newTodo}`}
          placeholder="What needs to be done?"
          value={inputValue}
          onChange={handleInputChange}
        />
        <input
          type="number"
          className={`${header['input-time']}`}
          placeholder="Min"
          value={minutes}
          onChange={(e) => handleMinutesChange(e.target.value)}
        />
        <input
          type="number"
          className={`${header['input-time']}`}
          placeholder="Sec"
          value={seconds}
          onChange={(e) => handleSecondsChange(e.target.value)}
        />
        <button type="submit"></button>
      </form>
    </header>
  )
}

Header.propTypes = {
  inputValue: PropTypes.string.isRequired,
  setInputValue: PropTypes.func.isRequired,
  setTask: PropTypes.func.isRequired,
  setTimers: PropTypes.func.isRequired,
}

export default Header
