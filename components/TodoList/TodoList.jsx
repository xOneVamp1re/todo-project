import React from 'react'
import PropTypes from 'prop-types'

import TodoItem from './TodoItem'

function TodoList({ tasks, onDelete, onToggle, onEdit }) {
  return (
    <ul className="todo-list">
      {tasks.map((task) => {
        return <TodoItem key={task.id} {...task} onToggle={onToggle} onDelete={onDelete} onEdit={onEdit} />
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
}

export default React.memo(TodoList)
