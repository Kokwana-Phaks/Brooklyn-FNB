import { useState } from "react";
import { FiEdit2, FiTrash2, FiCheck, FiFlag } from "react-icons/fi";
import { formatDueDate, getPriorityColor } from "../../../helpers";

export default function TaskItem ({task, onToggle, onDelete, onEdit}) {
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
                                className = "due-date"
                                style= {{color: getPriorityColor(task.dueDate) }}
                            >
                                <FiFlag size={12} /> {formatDueDate(task.dueDate)}
                            </span>
                        )}
                    </div>
                </div>
                {(isHovered || window.innerWidth < 768) && (
                    <div className="task-actions">
                        <button onClick={()=> onEdit(task)} arial-label="Edit task">
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