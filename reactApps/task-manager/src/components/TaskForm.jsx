import { useState } from "react";

export default function TaskForm ({onAdd}) {
    const [taskName, setTaskName] =useState ("");

    function handleSubmit(e) {
        e.preventDefault();
        if (!taskName.trim()) return;
        onAdd(taskName);
        setTaskName("");
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                placeholder="Add a tast..."
            />
            <button>Add Task</button>
        </form>
    );
}