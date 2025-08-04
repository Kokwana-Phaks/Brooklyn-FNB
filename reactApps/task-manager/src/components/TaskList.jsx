import TaskItem from "./TaskItem";

export default function Tasklist ({tasks, onDelete, onToggle}) {
    return (
        <ul>
            {tasks.map((task) =>(
                <TaskItem
                key={task.id}
                task={task}
                onDelete={onDelete}
                onToggle={onToggle}
                />
            ))}
        </ul>
    );
}

