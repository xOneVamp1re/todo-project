import React, { useCallback } from "react";

import TodoItem from "./TodoItem";

function TodoList({ tasks, setTasks }) {
  const handleToggle = useCallback(
    (id) => {
      setTasks((prevTasks) => {
        return prevTasks.map((task) => {
          return task.id === id
            ? {
                ...task,
                completed: !task.completed,
                status: !task.completed ? "Completed" : "Active",
              }
            : task;
        });
      });
    },
    [setTasks]
  );
  const handleDelete = useCallback(
    (id) => {
      setTasks((prevTasks) => {
        return prevTasks.filter((task) => task.id !== id);
      });
    },
    [setTasks]
  );
  const handleEdit = useCallback(
    (newText, id) => {
      setTasks((prevTasks) => {
        return prevTasks.map((task) => {
          return task.id === id ? { ...task, text: newText } : task;
        });
      });
    },
    [setTasks]
  );
  return (
    <ul className="todo-list">
      {tasks.map((task) => {
        return (
          <TodoItem
            key={task.id}
            {...task}
            onToggle={handleToggle}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        );
      })}
    </ul>
  );
}

export default React.memo(TodoList);
