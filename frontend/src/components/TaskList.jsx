import TaskItem from './TaskItem';
import './TaskList.css';

export default function TaskList({
  tasks,
  loading,
  toggling,
  deleting,
  onToggle,
  onDelete,
  onRefresh,
}) {
  if (loading && tasks.length === 0) {
    return (
      <div className="task-list-status">
        <span className="spinner spinner-lg" />
        <p>Loading tasks…</p>
      </div>
    );
  }

  if (!loading && tasks.length === 0) {
    return (
      <div className="task-list-status">
        <div className="empty-state">
          <span className="empty-icon">📋</span>
          <h3>No tasks yet</h3>
          <p>Add your first task above to get started.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="task-list">
      <div className="task-list-header">
        <span className="task-count">
          {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}
        </span>
        <button className="btn btn-ghost btn-sm" onClick={onRefresh} disabled={loading}>
          <span>⟳</span> Refresh
        </button>
      </div>
      <div className="task-items">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={onToggle}
            onDelete={onDelete}
            toggling={toggling === task.id}
            deleting={deleting === task.id}
          />
        ))}
      </div>
    </div>
  );
}
