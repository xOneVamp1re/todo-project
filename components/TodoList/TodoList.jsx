import React from 'react'
import PropTypes from 'prop-types'

import TodoItem from './TodoItem'

function TodoList({ tasks, onDelete, onToggle, onEdit, setTasks, setTimers, timers }) {
  return (
    <ul className="todo-list">
      {tasks.map((task) => {
        return (
          <TodoItem
            key={task.id}
            {...task}
            onToggle={onToggle}
            onDelete={onDelete}
            onEdit={onEdit}
            setTasks={setTasks}
            setTimers={setTimers}
            timers={timers}
          />
        )
      })}
    </ul>
  )
}

TodoList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
      status: PropTypes.string.isRequired,
      createAt: PropTypes.instanceOf(Date).isRequired,
    })
  ),
  setTasks: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  setTimers: PropTypes.func.isRequired,
  timers: PropTypes.object.isRequired,
}

export default React.memo(TodoList)
