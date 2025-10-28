import React, { useState, useEffect } from "react";
import api from "../../api/axios";
import { showError, showSuccess } from "../../utils/Alert/SweetAlert";

function TaskCreateToggle(props) {
  const [showForm, setShowForm] = useState(false);
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "pending",
    priority: "medium",
    due_date: "",
    collaborator_ids: [],
  });

  const toggleForm = () => setShowForm(!showForm);

  useEffect(() => {
    api
      .get("/users/")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (userId) => {
    setFormData((prev) => {
      const updated = prev.collaborator_ids.includes(userId)
        ? prev.collaborator_ids.filter((id) => id !== userId)
        : [...prev.collaborator_ids, userId];
      return { ...prev, collaborator_ids: updated };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/tasks/create/", formData);
      showSuccess("Task created successfully!");
      setFormData({
        title: "",
        description: "",
        status: "pending",
        priority: "medium",
        due_date: "",
        collaborator_ids: [],
      });
      props.onTaskCreated(); // Notify parent
      setShowForm(false);
    } catch (error) {
      console.error("Error creating task:", error);
      showError("Failed to create task.");
    }
  };

  return (
    <div className="mb-3">
      <button
        onClick={toggleForm}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition  shadow-lg hover:shadow-blue-700 hover:scale-105 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2"
      >
        {showForm ? "Cancel" : "➕ Add New Task"}
      </button>

      <div
        className={`transition-all duration-500 ease-in-out transform origin-top ${
          showForm
            ? "opacity-100 scale-100 max-h-[1000px]"
            : "opacity-0 scale-95 max-h-0"
        } overflow-hidden`}
      >
        <div className="max-w-md bg-white shadow-lg rounded-lg border border-gray-200 p-6">
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

            {/* Collaborator Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Assign Collaborators
              </label>
              <div className="flex flex-wrap gap-3">
                {users.map((user) => (
                  <label
                    key={user.id}
                    className={`flex items-center gap-2 px-3 py-2 border rounded cursor-pointer transition ${
                      formData.collaborator_ids.includes(user.id)
                        ? "bg-cyan-100 border-cyan-400"
                        : "bg-white border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <input
                      type="checkbox"
                      value={user.id}
                      checked={formData.collaborator_ids.includes(user.id)}
                      onChange={() => handleCheckboxChange(user.id)}
                      className="accent-cyan-500"
                    />
                    <span className="text-sm text-gray-800">
                      {user.username}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition rounded-xl shadow-lg hover:shadow-green-700 hover:scale-105 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2"
            >
              Submit Task
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export { TaskCreateToggle };
