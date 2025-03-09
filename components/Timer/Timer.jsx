import { useState, useEffect } from 'react'

import style from './Timer.module.css'

const Timer = () => {
  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    let timerInterval

    if (isRunning) {
      timerInterval = setInterval(() => {
        setTime((prevTime) => prevTime + 1)
      }, 1000)
    }

    return () => {
      clearInterval(timerInterval)
    }
  }, [isRunning])

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
      {formatTime(time)}
    </span>
  )
}

export default Timer
