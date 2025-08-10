import { useState, useEffect, useRef } from "react";
import {FiPlus, FiSave, FiX, FiCalender, FiCalendar} from 'react-icons/fi';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


export default function TaskForm({onAdd, editTask, onUpdate, setEditTask}) {
    cosnt [input, setInput] = useState('');
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
                    minDate={new date()}
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
                    <button typeof="button" onClick={resetForm} aria-label="cancel edit">
                        <FiX />
                    </button>
                )}
            </div>
        </form>
    );
}