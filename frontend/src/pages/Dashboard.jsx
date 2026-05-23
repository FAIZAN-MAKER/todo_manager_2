import { useState, useEffect, useCallback, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import './Dashboard.css';

export default function Dashboard() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [toggling, setToggling] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [filter, setFilter] = useState('all');
  const [error, setError] = useState('');
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => { mountedRef.current = false; };
  }, []);

  const loadTasks = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const params = filter !== 'all' ? { status: filter } : {};
      const res = await api.get('tasks/', { params });
      if (mountedRef.current) {
        setTasks(res.data.results || res.data);
      }
    } catch {
      if (mountedRef.current) {
        setError('Failed to load tasks. Please try again.');
      }
    } finally {
      if (mountedRef.current) {
        setLoading(false);
      }
    }
  }, [filter]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadTasks();
  }, [loadTasks]);

  const handleCreate = async (title) => {
    setCreating(true);
    try {
      const res = await api.post('tasks/', { title });
      setTasks((prev) => [res.data, ...prev]);
    } catch {
      setError('Failed to create task.');
    } finally {
      setCreating(false);
    }
  };

  const handleToggle = async (id, is_completed) => {
    setToggling(id);
    try {
      await api.patch(`tasks/${id}/`, { is_completed });
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? { ...t, is_completed } : t))
      );
    } catch {
      setError('Failed to update task.');
    } finally {
      setToggling(null);
    }
  };

  const handleDelete = async (id) => {
    setDeleting(id);
    try {
      await api.delete(`tasks/${id}/`);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch {
      setError('Failed to delete task.');
    } finally {
      setDeleting(null);
    }
  };

  const completedCount = tasks.filter((t) => t.is_completed).length;
  const pendingCount = tasks.length - completedCount;

  return (
    <div className="dashboard">
      <div className="dashboard-inner">
        <div className="dashboard-header">
          <div>
            <h1>Dashboard</h1>
            <p className="dashboard-welcome">
              Welcome back, <strong>{user?.fullname || user?.email}</strong>
            </p>
          </div>
        </div>

        <div className="dashboard-stats">
          <div className="stat-card">
            <span className="stat-value">{tasks.length}</span>
            <span className="stat-label">Total tasks</span>
          </div>
          <div className="stat-card stat-pending">
            <span className="stat-value">{pendingCount}</span>
            <span className="stat-label">Pending</span>
          </div>
          <div className="stat-card stat-completed">
            <span className="stat-value">{completedCount}</span>
            <span className="stat-label">Completed</span>
          </div>
        </div>

        <div className="dashboard-main card">
          <TaskForm onSubmit={handleCreate} loading={creating} />

          <div className="dashboard-filters">
            {['all', 'pending', 'completed'].map((f) => (
              <button
                key={f}
                className={`filter-btn${filter === f ? ' active' : ''}`}
                onClick={() => setFilter(f)}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          {error && <div className="dashboard-error">{error}</div>}

          <TaskList
            tasks={tasks}
            loading={loading}
            toggling={toggling}
            deleting={deleting}
            onToggle={handleToggle}
            onDelete={handleDelete}
            onRefresh={loadTasks}
          />
        </div>
      </div>
    </div>
  );
}
