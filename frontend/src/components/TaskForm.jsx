import { useState } from 'react';
import './TaskForm.css';

export default function TaskForm({ onSubmit, loading }) {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;
    onSubmit(trimmed);
    setTitle('');
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="task-form-input">
        <input
          type="text"
          placeholder="What needs to be done?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={255}
          disabled={loading}
        />
        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading || !title.trim()}
        >
          {loading ? <span className="spinner" /> : 'Add task'}
        </button>
      </div>
    </form>
  );
}
