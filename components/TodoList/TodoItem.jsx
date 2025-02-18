import { formatDistanceToNow } from 'date-fns'
import React from 'react'
import PropTypes from 'prop-types'

import TodoItemEdit from './TodoItemEdit'

function TodoItem({ id, text, completed, createAt, onToggle, onDelete, onEdit }) {
  console.log(`Rendering item ${id}`)
  const [isEditing, setIsEditing] = React.useState(false)

  const handleClickEdit = () => {
    setIsEditing((prevValue) => !prevValue)
  }

  const handleSaveEdit = (newText) => {
    onEdit(newText, id)
    setIsEditing(false)
  }

  const handleCancelEdit = () => setIsEditing(false)

  return (
    <li className={isEditing ? 'editing' : completed ? 'completed' : ''}>
      {isEditing ? (
        <TodoItemEdit text={text} onSave={handleSaveEdit} onCancel={handleCancelEdit} />
      ) : (
        <div className="view">
          <input
            className="toggle"
            name={`TodoItem${id}`}
            type="checkbox"
            defaultChecked={completed}
            onChange={() => onToggle(id)}
          />
          <label>
            <span className="description">{text}</span>
            <span className="created">{formatDistanceToNow(new Date(createAt), { addSuffix: true })}</span>
          </label>
          <button className="icon icon-edit" onClick={handleClickEdit}></button>
          <button className="icon icon-destroy" onClick={() => onDelete(id)}></button>
        </div>
      )}
    </li>
  )
}

TodoItem.propTypes = {
  id: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  createAt: PropTypes.instanceOf(Date).isRequired,
  onToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
}

export default React.memo(TodoItem)
