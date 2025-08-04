import { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";
import Tasklist from "./components/TaskList";
import "./App.css";

export default function App () {
  const [tasks, setTasks] = useState ([]);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);

  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  },[tasks]);

  function addTask(name) {
    setTasks((prev) => [
      ...prev,
      {id: Date.now(), name, completed: false},
    ]);
  }

  function deleteTask(id){
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }

  function toggleTask(id) {
    setTasks((prev) =>
    prev.map((task) =>
    task.id === id ? {...task, completed: !task.completed } : task 
    )
   );
  }

  return (
    <div className="container">
      <h1>Task Manager</h1>
      <TaskForm onAdd={addTask} />
      <Tasklist tasks={tasks} onDelete={deleteTask} onToggle={toggleTask} />
    </div>
  );
}