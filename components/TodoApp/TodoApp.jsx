"use client";
import { useState, useEffect } from "react";

import style from "../TodoApp/TodoApp.module.css";
import Header from "../Header";
import TodoList from "../TodoList";
import Footer from "../Footer/Footer";

export default function TodoApp() {
  const [inputValue, setInputValue] = useState("");
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");

  const filteredTasks = tasks.filter((task) => {
    if (filter === "All") return true;
    if (filter === "Active") return !task.completed;
    if (filter === "Completed") return task.completed;
    return true;
  });

  useEffect(() => {
    console.log("Tasks updated:", tasks);
  }, [tasks]);
  return (
    <section className={style.todoapp}>
      <Header
        inputValue={inputValue}
        setInputValue={setInputValue}
        setTask={setTasks}
      />
      <section className="main">
        <TodoList tasks={filteredTasks} setTasks={setTasks} />
        <Footer
          tasks={tasks}
          setTasks={setTasks}
          setFilter={setFilter}
          filter={filter}
        />
      </section>
    </section>
  );
}
