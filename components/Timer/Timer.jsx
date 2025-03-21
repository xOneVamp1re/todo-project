import PropTypes from 'prop-types'

import styles from './Timer.module.css'

const Timer = ({ id, timers, startTimer, stopTimer }) => {
  const duration = timers[id]?.duration
  const isActive = timers[id]?.active

  const convertTime = (time) => {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
  }
  return duration !== 'withoutTimer' ? (
    <span className={styles.description}>
      <button className={`${styles.icon} ${styles['icon-play']}`} onClick={() => startTimer(id)} disabled={isActive} />
      <button className={`${styles.icon} ${styles['icon-pause']}`} onClick={() => stopTimer(id)} disabled={!isActive} />
      {}
      {convertTime(duration) !== '00:00' ? convertTime(duration) : 'Таймер истёк'}
    </span>
  ) : null
}

Timer.propTypes = {
  id: PropTypes.number.isRequired,
  timers: PropTypes.object.isRequired,
  startTimer: PropTypes.func.isRequired,
  stopTimer: PropTypes.func.isRequired,
}

export default Timer

{
  /* 
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

          <span className={styles.description}>
          <button className={`${styles.icon} ${styles['icon-play']}`}></button>
          <button className={`${styles.icon} ${styles['icon-pause']}`}></button>
          {initialTime}

   </span>

 const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
  }

       */
}
