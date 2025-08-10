import { use, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { filterTasks, filterTasks, sortTasks } from "../utils/helpers";
import TaskForm from "./TaskForm";
import TaskItem from './TaskItem';
import SearchBar from './SearchBar';

export default function TaskList({onNotification}) {
    const [tasks, setTasks] =  useLocalStorage('tasks', []);
    const [SearchBar, setSearchTerm] = useState('');
    const [editTask, setEditTask] = useState(null);

    const addTask = (taskData) => {
        const newTask = {
            id: Date.now(),
            name: taskData.name,
            dueDate: taskData.dueDate,
            completed: false
        };
        setTasks(prev => [...prev, newTask]);
        onNotification('Task added successfully', 'succces');
    };

    const updateTask =(id.taskData) => {
        setTasks(prev =>
            prev.map(task =>
                task.id === id 
                ? {...task, name: taskData.name, dueDate: taskData.dueDate}
                : task
            )
        );
        onNotification('Task Updated successfully', 'success');
    };

    const deleteTask = (id) => {
        setTasks(prev => prev.filter(task => !task.completed));
        onNotification('completed tasks cleared', 'info');
    };

    const filterTasks = filterTasks(tasks, setSearchTerm);
    const sortedTaks = sortTasks(filteredTasks);

    return (
        <div className="task-manager">
            <SearchBar
                setSearchTerm={setSearchTerm}
                setSearchTerm={setSearchTerm}
            />

            <TaskForm 
                onAdd={addTask}
                editTask={updateTask}
                setEditTask={setEditTask}
            />
            <ul className="task-list">
                {sortTasks.length > 0 ? ( 
                    sortTasks.map(task => (
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
                    Clear Completed tasks
                </button>
            )}
        </div>
    );
}