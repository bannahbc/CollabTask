// src/components/TaskCreator.js
import React, { useState } from 'react';
import api from '../../api/axios';

function TaskCreator() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'pending',
    priority: 'medium',
    due_date: '',
  });

  const toggleForm = () => setShowForm(!showForm);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/tasks/', formData);
      alert('Task created!');
      setFormData({
        title: '',
        description: '',
        status: 'pending',
        priority: 'medium',
        due_date: '',
      });
      setShowForm(false); // hide form after submission
    } catch (error) {
      console.error('Error creating task:', error);
      alert('Failed to create task.');
    }
  };

  return (
    <div>
      <button onClick={toggleForm}>
        {showForm ? 'Cancel' : 'Create New Task'}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
          />
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <select name="priority" value={formData.priority} onChange={handleChange}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <input
            type="date"
            name="due_date"
            value={formData.due_date}
            onChange={handleChange}
          />
          <button type="submit">Submit Task</button>
        </form>
      )}
    </div>
  );
}

export default TaskCreator;



function TaskCreateToggle() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'pending',
    priority: 'medium',
    due_date: '',
  });

  const toggleForm = () => setShowForm(!showForm);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    
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
      });
      setShowForm(false);
    } catch (error) {
      console.error('Error creating task:', error);
      console.log(error.response);

      
      alert('Failed to create task.');
    }
  };

  return (
    <div className="max-w-md bg-white shadow-lg rounded-lg p-6 border border-gray-200 mb-3">
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
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
          />
          <div className="flex gap-4">
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
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
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
          required/>
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

export {TaskCreateToggle};
