// import React from "react";
import React, { useState } from "react";
import api from "../../api/axios";
// import { showSuccess } from "../utils/alert/SweetAlert";
import { showSuccess } from "../../utils/Alert/SweetAlert";
const TaskViewModal = ({ title, status, priority, due_date, description, onClose, onEdit }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md ">
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md">
  <div className="w-full max-w-3xl mx-4 bg-white rounded-2xl shadow-2xl p-6 sm:p-8 overflow-y-auto max-h-[90vh]">

          <h2 className="text-2xl font-bold mb-6 text-blue-600 text-center">
            {title}
          </h2>

          <div className="space-y-3 text-gray-700 text-sm">
            <p>
              <strong>Status:</strong> {status}
            </p>
            <p>
              <strong>Priority:</strong> {priority}
            </p>
            <p>
              <strong>Due Date:</strong> {due_date}
            </p>
            <p>
              <strong>Description:</strong> {description}
            </p>
          </div>

          <div className="flex justify-end gap-3 mt-8">
            <button
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
              onClick={onEdit}
            >
              Edit
            </button>
            <button
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export  {TaskViewModal, TaskEditModal};





const TaskEditModal = ({
  id,
  title,
  status,
  priority,
  due_date,
  description,
  onClose,
  onTaskUpdated,
}) => {
  const [editTitle, setEditTitle] = useState(title);
  const [editStatus, setEditStatus] = useState(status);
  const [editPriority, setEditPriority] = useState(priority);
  const [editdue_date, setEditdue_date] = useState(() => {
  try {
    const iso = new Date(due_date).toISOString();
    return iso.split("T")[0];
  } catch (err) {
    console.warn("Invalid due_date:", due_date);
    return "";
  }
});

  const [editDescription, setEditDescription] = useState(description);
  const hasChanges =
    editTitle !== title ||
    editStatus !== status ||
    editPriority !== priority ||
    editdue_date !== due_date ||
    editDescription !== description;

  const handleSave = async () => {
    try {
      await api.put(`/tasks/update/${id}/`, {
        title: editTitle,
        status: editStatus,
        priority: editPriority,
        due_date: editdue_date,
        description: editDescription,
      });
      showSuccess("Task updated successfully!");
      onClose();
      if (onTaskUpdated) onTaskUpdated();
    } catch (error) {
      console.error("Error updating task:", error);
      alert("Failed to update task.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md">
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md">
  <div className="w-full max-w-3xl mx-4 bg-white rounded-2xl shadow-2xl p-6 sm:p-8 overflow-y-auto max-h-[90vh]">
          <h2 className="text-2xl font-bold mb-6 text-blue-600 text-center">
            Edit Task
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                value={editStatus}
                onChange={(e) => setEditStatus(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Priority
              </label>
              <select
                value={editPriority}
                onChange={(e) => setEditPriority(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Due Date
              </label>
              <input
                type="date"
                value={editdue_date}
                onChange={(e) => setEditdue_date(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                rows={5}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-8">
            <button
              className={`px-4 py-2 rounded-lg transition ${
                hasChanges
                  ? "bg-indigo-500 text-white hover:bg-indigo-600"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              onClick={handleSave}
              disabled={!hasChanges}
            >
              Save
            </button>
            <button
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// export default TaskEditModal;
