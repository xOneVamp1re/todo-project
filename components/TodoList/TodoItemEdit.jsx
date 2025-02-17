import React, { useCallback, useState } from 'react'

function TodoItemEdit({ text, onSave, onCancel }) {
  const [title, setTitle] = useState(text)

  const handleSubmit = (event) => {
    event.preventDefault()
    onSave(title)
  }

  const handleCancel = () => {
    onCancel()
  }

  return (
    <div className="view">
      <form onSubmit={handleSubmit}>
        <input className="edit" type="text" value={title} onChange={(e) => setTitle(() => e.target.value)} />
        <div className="buttons">
          <button type="submit" className="button button-save" onClick={handleSubmit}>
            Save
          </button>
          <button type="button" className="button button-cancel" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
export default TodoItemEdit
