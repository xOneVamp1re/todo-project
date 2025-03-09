import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import style from './Timer.module.css'

const Timer = ({ seconds, setTasks, id }) => {
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    let timerInterval

    if (isRunning) {
      timerInterval = setInterval(() => {
        setTasks((prev) => {
          return prev.map((el) => {
            if (el.id === id) {
              return { ...el, seconds: el.seconds + 1 }
            }
            return el
          })
        })
      }, 1000)
    }

    return () => {
      clearInterval(timerInterval)
    }
  }, [id, isRunning, seconds, setTasks])

  const handleStart = () => {
    setIsRunning(true)
  }
  const handlePause = () => {
    setIsRunning(false)
  }

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
  }

  return (
    <span className={style.description}>
      <button className={`${style.icon} ${style['icon-play']}`} onClick={handleStart}></button>
      <button className={`${style.icon} ${style['icon-pause']}`} onClick={handlePause}></button>
      {formatTime(seconds)}
    </span>
  )
}

Timer.propTypes = {
  seconds: PropTypes.number.isRequired,
  setTasks: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
}

export default Timer
