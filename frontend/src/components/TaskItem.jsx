import './TaskItem.css';

export default function TaskItem({ task, onToggle, onDelete, toggling, deleting }) {
  const dateStr = new Date(task.created_at).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className={`task-item${task.is_completed ? ' completed' : ''}`}>
      <button
        className={`task-check${task.is_completed ? ' checked' : ''}`}
        onClick={() => onToggle(task.id, !task.is_completed)}
        disabled={toggling}
        aria-label={task.is_completed ? 'Mark as pending' : 'Mark as completed'}
      >
        {task.is_completed && <span className="task-check-icon">✓</span>}
      </button>

      <div className="task-body">
        <span className="task-title">{task.title}</span>
        <span className="task-date">{dateStr}</span>
      </div>

      <button
        className="task-delete"
        onClick={() => onDelete(task.id)}
        disabled={deleting}
        aria-label="Delete task"
      >
        ✕
      </button>
    </div>
  );
}
