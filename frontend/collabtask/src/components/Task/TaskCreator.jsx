import React, { useState, useEffect } from 'react';
import api from '../../api/axios';

function TaskCreateToggle(props) {
  const [showForm, setShowForm] = useState(false);
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'pending',
    priority: 'medium',
    due_date: '',
    collaborators: [],
  });

  const toggleForm = () => setShowForm(!showForm);

  useEffect(() => {
    api.get('/users/')
      .then((res) => setUsers(res.data))
      .catch((err) => console.error('Error fetching users:', err));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (userId) => {
    setFormData((prev) => {
      const updated = prev.collaborators.includes(userId)
        ? prev.collaborators.filter((id) => id !== userId)
        : [...prev.collaborators, userId];
      return { ...prev, collaborators: updated };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/tasks/create/', formData);
      alert('Task created!');
      setFormData({
        title: '',
        description: '',
        status: 'pending',
        priority: 'medium',
        due_date: '',
        collaborators: [],
      });
      props.onTaskCreated(); // Notify parent
      setShowForm(false);
    } catch (error) {
      console.error('Error creating task:', error);
      alert('Failed to create task.');
    }
  };

  return (
    <div className="max-w-md bg-white shadow-lg rounded-lg p-6 border border-gray-200 mb-3 transition duration-300 ease-in-out">
      <button
        onClick={toggleForm}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        {showForm ? 'Cancel' : 'Create Task'}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />
          <div className="flex gap-4">
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="flex-1 px-3 py-2 border border-gray-300 rounded"
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="flex-1 px-3 py-2 border border-gray-300 rounded"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <input
            type="date"
            name="due_date"
            value={formData.due_date}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            required
          />

          {/* Collaborator Checkboxes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Assign Collaborators</label>
            <div className="grid grid-cols-2 gap-2">
              {users.map((user) => (
                <label key={user.id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={user.id}
                    checked={formData.collaborators.includes(user.id)}
                    onChange={() => handleCheckboxChange(user.id)}
                    className="accent-cyan-500"
                  />
                  <span className="text-sm text-gray-800">{user.username}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            Submit Task
          </button>
        </form>
      )}
    </div>
  );
}

export { TaskCreateToggle };
