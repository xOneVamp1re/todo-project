import header from "./Header.module.css";

import { useCallback } from "react";

export default function Header({ inputValue, setInputValue, setTask }) {
  const handleInputChange = (event) => {
    event.preventDefault();
    setInputValue(event.target.value);
  };
  const handleInputSubmit = (event) => {
    event.preventDefault();
    const newTask = {
      id: Date.now(),
      text: inputValue,
      completed: false,
      status: "Active",
      createAt: new Date(),
    };
    setTask((prevTask) => {
      return [...prevTask, newTask];
    });
    setInputValue("");
  };
  return (
    <header className={header.header}>
      <h1 className={header.title}>Todo List</h1>
      <form onSubmit={handleInputSubmit}>
        <input
          className={`${header.input} ${header.newTodo}`}
          placeholder="What needs to be done?"
          value={inputValue}
          onChange={handleInputChange}
          autoFocus
        />
      </form>
    </header>
  );
}
