1. Project Setup
First, let's set up the project structure and install dependencies:

bash
npm create vite@latest taskmaster --template react
cd taskmaster
npm install react-icons date-fns react-datepicker
2. Folder Structure
text
src/
├── components/
│   ├── TaskForm.jsx
│   ├── TaskItem.jsx
│   ├── TaskList.jsx
│   ├── SearchBar.jsx
│   ├── ThemeToggle.jsx
│   ├── AppTour.jsx
│   └── Notification.jsx
├── contexts/
│   └── ThemeContext.jsx
├── hooks/
│   ├── useLocalStorage.js
│   └── useKeyPress.js
├── utils/
│   └── helpers.js
├── App.jsx
├── main.jsx
└── App.css
3. Utility Functions (utils/helpers.js)
javascript
import { format, isToday, isTomorrow, parseISO } from 'date-fns';

// Format due date for display
export const formatDueDate = (dateString) => {
  if (!dateString) return null;
  
  const date = parseISO(dateString);
  if (isToday(date)) return 'Today';
  if (isTomorrow(date)) return 'Tomorrow';
  return format(date, 'MMM d');
};

// Get priority color based on due date
export const getPriorityColor = (dateString) => {
  if (!dateString) return 'var(--text-light)';
  
  const date = parseISO(dateString);
  const now = new Date();
  const diffTime = date - now;
  const diffDays = diffTime / (1000 * 60 * 60 * 24);

  if (diffDays < 0) return 'var(--danger)';    // Overdue
  if (diffDays < 1) return 'var(--warning)';   // Due today
  return 'var(--success)';                     // Future
};

// Filter tasks by search term
export const filterTasks = (tasks, searchTerm) => {
  return tasks.filter(task => 
    task.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

// Sort tasks by completion and due date
export const sortTasks = (tasks) => {
  return [...tasks].sort((a, b) => {
    // Incomplete tasks first
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    
    // Then sort by due date (earlier first)
    if (a.dueDate && b.dueDate) {
      return new Date(a.dueDate) - new Date(b.dueDate);
    }
    if (a.dueDate) return -1;
    if (b.dueDate) return 1;
    
    // Finally by creation date (newest first)
    return b.id - a.id;
  });
};
4. Context (contexts/ThemeContext.jsx)
jsx
import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return saved ? JSON.parse(saved) : prefersDark;
  });

  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(isDark));
    document.body.className = isDark ? 'dark' : 'light';
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
5. Custom Hooks
hooks/useLocalStorage.js
javascript
import { useState, useEffect } from 'react';

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, value]);

  return [value, setValue];
}
hooks/useKeyPress.js
javascript
import { useEffect, useState } from 'react';

export function useKeyPress(targetKeys, withModifier = false) {
  const [keyPressed, setKeyPressed] = useState(false);
  const keys = Array.isArray(targetKeys) ? targetKeys : [targetKeys];

  useEffect(() => {
    const downHandler = ({ key, ctrlKey, metaKey }) => {
      if (keys.includes(key) && (!withModifier || ctrlKey || metaKey)) {
        setKeyPressed(true);
      }
    };

    const upHandler = ({ key }) => {
      if (keys.includes(key)) {
        setKeyPressed(false);
      }
    };

    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);

    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, [keys, withModifier]);

  return keyPressed;
}
6. Main Components
components/TaskForm.jsx
jsx
import { useState, useEffect, useRef } from 'react';
import { FiPlus, FiSave, FiX, FiCalendar } from 'react-icons/fi';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function TaskForm({ onAdd, editTask, onUpdate, setEditTask }) {
  const [input, setInput] = useState('');
  const [dueDate, setDueDate] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (editTask) {
      setInput(editTask.name);
      setDueDate(editTask.dueDate ? new Date(editTask.dueDate) : null);
      inputRef.current.focus();
    }
  }, [editTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    const taskData = {
      name: trimmed,
      dueDate: dueDate ? dueDate.toISOString() : null
    };

    editTask ? onUpdate(editTask.id, taskData) : onAdd(taskData);
    resetForm();
  };

  const resetForm = () => {
    setInput('');
    setDueDate(null);
    setEditTask(null);
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <div className="form-group">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={editTask ? "Edit task..." : "Add new task..."}
          aria-label="Task input"
        />
        <div className="date-picker-container">
          <FiCalendar className="calendar-icon" />
          <DatePicker
            selected={dueDate}
            onChange={(date) => setDueDate(date)}
            placeholderText="Due date (optional)"
            minDate={new Date()}
            dateFormat="MMM d, yyyy"
            isClearable
          />
        </div>
      </div>
      <div className="form-actions">
        <button type="submit" aria-label={editTask ? "Save changes" : "Add task"}>
          {editTask ? <FiSave /> : <FiPlus />}
        </button>
        {editTask && (
          <button type="button" onClick={resetForm} aria-label="Cancel edit">
            <FiX />
          </button>
        )}
      </div>
    </form>
  );
}
components/TaskItem.jsx
jsx
import { useState } from 'react';
import { FiEdit2, FiTrash2, FiCheck, FiFlag } from 'react-icons/fi';
import { formatDueDate, getPriorityColor } from '../utils/helpers';

export default function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <li 
      className={`task-item ${task.completed ? 'completed' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="task-content">
        <button 
          onClick={() => onToggle(task.id)} 
          aria-label={task.completed ? "Mark incomplete" : "Mark complete"}
          className="toggle-btn"
        >
          <FiCheck className={task.completed ? 'checked' : ''} />
        </button>
        <div className="task-text">
          <span>{task.name}</span>
          {task.dueDate && (
            <span 
              className="due-date" 
              style={{ color: getPriorityColor(task.dueDate) }}
            >
              <FiFlag size={12} /> {formatDueDate(task.dueDate)}
            </span>
          )}
        </div>
      </div>
      {(isHovered || window.innerWidth < 768) && (
        <div className="task-actions">
          <button onClick={() => onEdit(task)} aria-label="Edit task">
            <FiEdit2 />
          </button>
          <button 
            onClick={() => onDelete(task.id)} 
            aria-label="Delete task"
            className="delete-btn"
          >
            <FiTrash2 />
          </button>
        </div>
      )}
    </li>
  );
}
components/TaskList.jsx
jsx
import { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { filterTasks, sortTasks } from '../utils/helpers';
import TaskForm from './TaskForm';
import TaskItem from './TaskItem';
import SearchBar from './SearchBar';

export default function TaskList({ onNotification }) {
  const [tasks, setTasks] = useLocalStorage('tasks', []);
  const [searchTerm, setSearchTerm] = useState('');
  const [editTask, setEditTask] = useState(null);

  const addTask = (taskData) => {
    const newTask = {
      id: Date.now(),
      name: taskData.name,
      dueDate: taskData.dueDate,
      completed: false
    };
    setTasks(prev => [...prev, newTask]);
    onNotification('Task added successfully', 'success');
  };

  const updateTask = (id, taskData) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id 
          ? { ...task, name: taskData.name, dueDate: taskData.dueDate }
          : task
      )
    );
    onNotification('Task updated successfully', 'success');
  };

  const toggleTask = (id) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(task => task.id !== id));
    if (editTask?.id === id) setEditTask(null);
    onNotification('Task deleted', 'warning');
  };

  const clearCompleted = () => {
    setTasks(prev => prev.filter(task => !task.completed));
    onNotification('Completed tasks cleared', 'info');
  };

  const filteredTasks = filterTasks(tasks, searchTerm);
  const sortedTasks = sortTasks(filteredTasks);

  return (
    <div className="task-manager">
      <SearchBar 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
      />
      
      <TaskForm 
        onAdd={addTask}
        editTask={editTask}
        onUpdate={updateTask}
        setEditTask={setEditTask}
      />
      
      <ul className="task-list">
        {sortedTasks.length > 0 ? (
          sortedTasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={toggleTask}
              onDelete={deleteTask}
              onEdit={setEditTask}
            />
          ))
        ) : (
          <p className="empty-state">
            {tasks.length ? 'No tasks match your search' : 'No tasks yet! Add one above'}
          </p>
        )}
      </ul>
      
      {tasks.some(task => task.completed) && (
        <button 
          onClick={clearCompleted} 
          className="clear-completed-btn"
        >
          Clear completed tasks
        </button>
      )}
    </div>
  );
}
7. App.jsx (Main Component)
jsx
import { useState, useEffect } from 'react';
import { useTheme } from './contexts/ThemeContext';
import { useKeyPress } from './hooks/useKeyPress';
import TaskList from './components/TaskList';
import ThemeToggle from './components/ThemeToggle';
import AppTour from './components/AppTour';
import Notification from './components/Notification';
import './App.css';

export default function App() {
  const { isDark } = useTheme();
  const [showTour, setShowTour] = useState(
    !localStorage.getItem('hasShownTour')
  );
  const [notification, setNotification] = useState(null);
  const isHelpKeyPressed = useKeyPress('?', true);

  const showNotification = (message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const completeTour = () => {
    setShowTour(false);
    localStorage.setItem('hasShownTour', 'true');
  };

  useEffect(() => {
    if (isHelpKeyPressed) setShowTour(true);
  }, [isHelpKeyPressed]);

  return (
    <div className={`app ${isDark ? 'dark' : 'light'}`}>
      <header className="app-header">
        <h1>TaskMaster</h1>
        <div className="header-controls">
          <button 
            onClick={() => setShowTour(true)}
            className="help-btn"
            aria-label="Show tutorial"
          >
            ? Help
          </button>
          <ThemeToggle />
        </div>
      </header>

      <main className="app-main">
        <TaskList onNotification={showNotification} />
      </main>

      {showTour && <AppTour onClose={completeTour} />}
      {notification && <Notification {...notification} />}

      <footer className="app-footer">
        <p>© {new Date().getFullYear()} TaskMaster - Press Ctrl+? for help</p>
      </footer>
    </div>
  );
}
8. Supporting Components
components/ThemeToggle.jsx
jsx
import { useTheme } from '../contexts/ThemeContext';
import { FiSun, FiMoon } from 'react-icons/fi';

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button 
      onClick={toggleTheme}
      className="theme-toggle"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? <FiSun /> : <FiMoon />}
    </button>
  );
}
components/Notification.jsx
jsx
export default function Notification({ message, type = 'info' }) {
  return (
    <div className={`notification ${type}`}>
      {message}
    </div>
  );
}
components/AppTour.jsx
jsx
export default function AppTour({ onClose }) {
  return (
    <div className="app-tour-overlay">
      <div className="app-tour-content">
        <h2>Welcome to TaskMaster!</h2>
        <ol className="tour-steps">
          <li>Click "+" to add new tasks</li>
          <li>Click the checkbox to mark tasks complete</li>
          <li>Click the pencil icon to edit tasks</li>
          <li>Set due dates to prioritize tasks</li>
          <li>Use the search bar to find specific tasks</li>
          <li>Toggle dark/light mode in the top right</li>
        </ol>
        <button 
          onClick={onClose}
          className="tour-close-btn"
        >
          Got it!
        </button>
      </div>
    </div>
  );
}
components/SearchBar.jsx
jsx
export default function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search tasks..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
    </div>
  );
}
9. CSS Styling (App.css)
css
/* Variables */
:root {
  --primary: #4361ee;
  --primary-light: #4895ef;
  --primary-dark: #3f37c9;
  --secondary: #3a0ca3;
  --success: #4cc9f0;
  --warning: #f8961e;
  --danger: #f72585;
  --text: #2b2d42;
  --text-light: #8d99ae;
  --bg: #f8f9fa;
  --card: #ffffff;
  --border: #dee2e6;
  --shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.dark {
  --primary: #4895ef;
  --primary-light: #4cc9f0;
  --primary-dark: #4361ee;
  --secondary: #3a0ca3;
  --text: #f8f9fa;
  --text-light: #adb5bd;
  --bg: #212529;
  --card: #343a40;
  --border: #495057;
  --shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

/* Base Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  transition: background-color 0.3s ease, color 0.1s ease;
}

body {
  font-family: 'Segoe UI', system-ui, sans-serif;
  background-color: var(--bg);
  color: var(--text);
  line-height: 1.6;
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Header */
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  border-bottom: 1px solid var(--border);
  background-color: var(--card);
  box-shadow: var(--shadow);
  position: sticky;
  top: 0;
  z-index: 100;
}

.app-header h1 {
  font-size: 1.5rem;
  color: var(--primary);
}

.header-controls {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.help-btn, .theme-toggle {
  background: var(--primary);
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.help-btn:hover, .theme-toggle:hover {
  background: var(--primary-dark);
}

/* Main Content */
.app-main {
  flex: 1;
  padding: 2rem;
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
}

/* Task Form */
.task-form {
  background: var(--card);
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  box-shadow: var(--shadow);
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.task-form input[type="text"] {
  width: 100%;
  padding: 0.8rem 1rem;
  border: 1px solid var(--border);
  border-radius: 4px;
  background: var(--card);
  color: var(--text);
  font-size: 1rem;
}

.date-picker-container {
  position: relative;
  display: flex;
  align-items: center;
}

.calendar-icon {
  position: absolute;
  left: 10px;
  color: var(--text-light);
}

.react-datepicker-wrapper {
  width: 100%;
}

.react-datepicker__input-container input {
  width: 100%;
  padding: 0.8rem 1rem 0.8rem 2rem;
  border: 1px solid var(--border);
  border-radius: 4px;
  background: var(--card);
  color: var(--text);
}

.form-actions {
  display: flex;
  gap: 0.5rem;
}

.task-form button {
  padding: 0.8rem;
  border: none;
  border-radius: 4px;
  background: var(--primary);
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.task-form button:hover {
  background: var(--primary-dark);
}

/* Task List */
.task-list {
  list-style: none;
}

.task-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  margin-bottom: 0.5rem;
  background: var(--card);
  border-radius: 8px;
  box-shadow: var(--shadow);
}

.task-item.completed {
  opacity: 0.7;
}

.task-item.completed .task-text span:first-child {
  text-decoration: line-through;
  color: var(--text-light);
}

.task-content {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
}

.toggle-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-light);
  font-size: 1.2rem;
}

.toggle-btn .checked {
  color: var(--success);
}

.task-text {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.due-date {
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

.task-actions {
  display: flex;
  gap: 0.5rem;
}

.task-actions button {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-light);
  font-size: 1rem;
}

.task-actions button:hover {
  color: var(--primary);
}

.delete-btn:hover {
  color: var(--danger) !important;
}

.empty-state {
  text-align: center;
  padding: 2rem;
  color: var(--text-light);
}

.clear-completed-btn {
  display: block;
  width: 100%;
  padding: 0.8rem;
  margin-top: 1rem;
  background: var(--danger);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.clear-completed-btn:hover {
  background: #d11a5a;
}

/* Footer */
.app-footer {
  text-align: center;
  padding: 1rem;
  background: var(--card);
  border-top: 1px solid var(--border);
  color: var(--text-light);
  font-size: 0.9rem;
}

/* Notification */
.notification {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  background: var(--primary);
  color: white;
  box-shadow: var(--shadow);
  z-index: 1000;
  animation: slideIn 0.3s ease-out;
}

.notification.error {
  background: var(--danger);
}

.notification.warning {
  background: var(--warning);
}

.notification.success {
  background: var(--success);
}

@keyframes slideIn {
  from {
    transform: translateY(100px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* App Tour */
.app-tour-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
}

.app-tour-content {
  background: var(--card);
  padding: 2rem;
  border-radius: 8px;
  max-width: 500px;
  width: 90%;
}

.tour-steps {
  margin: 1.5rem 0;
  padding-left: 1.5rem;
}

.tour-steps li {
  margin-bottom: 0.8rem;
}

.tour-close-btn {
  display: block;
  width: 100%;
  padding: 0.8rem;
  background: var(--primary);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.tour-close-btn:hover {
  background: var(--primary-dark);
}

/* Responsive */
@media (max-width: 768px) {
  .app-header {
    padding: 1rem;
  }
  
  .app-main {
    padding: 1rem;
  }
  
  .task-actions {
    display: flex !important;
  }
}
10. Main Entry Point (main.jsx)
jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from './contexts/ThemeContext';
import App from './App';
import './App.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
11. README.md
markdown
# TaskMaster - Modern Task Manager

![TaskMaster Screenshot](./public/screenshot.png)

A beautiful, feature-rich task management application built with React and Vite.

## Features

- ✅ Add, edit, and delete tasks
- 📅 Due dates with visual priority indicators
- 🌗 Dark/light mode with system preference detection
- 🔍 Real-time search functionality
- 🎨 Sleek animations and transitions
- 📱 Fully responsive design
- 💾 Local storage persistence
- 🆘 Interactive tutorial (Ctrl+? shortcut)

## Technologies

- React 18
- Vite
- React Icons
- date-fns (date utilities)
- react-datepicker

## Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/taskmaster.git
Install dependencies

bash
cd taskmaster
npm install
Run development server

bash
npm run dev
Deployment
https://vercel.com/button

License
MIT License

text

## **Final Steps**

1. Create a `public/screenshot.png` of your application
2. Initialize Git and push to GitHub:
```bash
git init
git add .
git commit -m "feat: complete task manager with all features"
git remote add origin https://github.com/yourusername/taskmaster.git
git push -u origin main
