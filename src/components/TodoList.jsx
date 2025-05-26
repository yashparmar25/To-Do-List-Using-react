import React, { useState, useEffect } from 'react';
import './TodoList.css';

function TodoList() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'completed', 'incomplete'
  const [sortBy, setSortBy] = useState('none'); // 'none', 'text', 'completed'

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleInputChange = (event) => {
    setNewTask(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      addTask();
    }
  };

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { text: newTask, completed: false, id: Date.now() }]);
      setNewTask('');
    }
  };

  const removeTask = (id) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
  };

  const toggleComplete = (id) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'incomplete') return !task.completed;
    return true;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === 'text') return a.text.localeCompare(b.text);
    if (sortBy === 'completed') return a.completed - b.completed;
    return 0;
  });

  return (
    <div className="todo-container">
      <div className="todo-header">
        <h2>My Tasks</h2>
        <div className="task-input-container">
          <input
            type="text"
            value={newTask}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Add a new task..."
            className="task-input"
          />
          <button onClick={addTask} className="add-button">
            Add Task
          </button>
        </div>
      </div>

      <div className="controls">
        <div className="filter-control">
          <label htmlFor="filter">Filter:</label>
          <select
            id="filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="select-control"
          >
            <option value="all">All Tasks</option>
            <option value="completed">Completed</option>
            <option value="incomplete">Incomplete</option>
          </select>
        </div>

        <div className="sort-control">
          <label htmlFor="sort">Sort:</label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="select-control"
          >
            <option value="none">No Sorting</option>
            <option value="text">By Text</option>
            <option value="completed">By Status</option>
          </select>
        </div>
      </div>

      <div className="tasks-list">
        {sortedTasks.length === 0 ? (
          <p className="no-tasks">No tasks to display</p>
        ) : (
          sortedTasks.map((task) => (
            <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
              <div className="task-content">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleComplete(task.id)}
                  className="task-checkbox"
                />
                <span className="task-text">{task.text}</span>
              </div>
              <button
                onClick={() => removeTask(task.id)}
                className="remove-button"
                title="Remove task"
              >
                ×
              </button>
            </div>
          ))
        )}
      </div>

      <div className="todo-footer">
        <p>Total tasks: {tasks.length}</p>
        <p>Completed: {tasks.filter(task => task.completed).length}</p>
      </div>
    </div>
  );
}

export default TodoList; 