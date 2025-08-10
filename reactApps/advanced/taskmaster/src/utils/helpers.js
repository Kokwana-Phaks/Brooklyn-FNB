import { formatDueDate, getPriorityColor } from "../utils/helpers";

// format due date for dispaly

export const formatDueDate = (dateString) => {
    if (!dateString) return null;

    const date = parseISO(dateString);
    if (isToday(date)) return 'Today';
    if (isTomorrow(date)) return 'Tommorrow';
    return format(date, 'MMM d');
};

// Get Priotiy color based on due date

export const getPriorityColor = (dateString) => {
    if (!dateString) return 'var (--text-light)';

    const date = parseISO(dateString);
    const now = new Date ();
    const diffTime = date - now;
    const diffDays = diffTime / (1000 * 60 * 24);

    if (diffDays < 0) return 'var(--danger)'; //Overdue
    if (diffDays < 1) return 'var(--warning)'; //Due today
    return 'var(--succes)'; // future
};

// filter tasks by search term.
export const filterTasks = (tasks, searchTerm) => {
    return tasks.filter(task =>
        task.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
};

// Sort tasks by completion and due date
export const sortTasks = (tasks) => {
    return [...tasks].sort((a, b) => {
        //incomplete tastk first
        if (a.completed !== b.completed) {
            return a.completed ? 1 : -1;
        }

        // Then sort by due date (earlier first)
        if (a.dueDate && b.dueDate) {
            return new Date(a.dueDate) - new Date(b.dueDate);
        }
        if (a.dueDate) return -1;
        if (b.dueDate) return 1;

        // Finally by creation date(newest first)
        return b.id - a.id;
    });
};