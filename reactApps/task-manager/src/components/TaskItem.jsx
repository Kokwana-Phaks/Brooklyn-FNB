export default function TaskItem({task, onDelete, onToggle}) {
    return (
        <li>
            <input type="checkbox"
            checked={task.completed}
            onChange={()=> onToggle(task.id)}
             />
             <span style={{textDecoration: task.completed ? "line-through" : "none"}}>
                {task.name}
             </span>
             <button onClick={() => onDelete(task.id)}>Delete</button>
        </li>
    );
}