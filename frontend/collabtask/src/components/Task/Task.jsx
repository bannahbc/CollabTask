import React,{useState} from 'react';
import { useEffect } from 'react';
import API from '../../api/axios';
import api from '../../api/axios'; 
import { TaskCreateToggle } from './TaskCreator';
function Filters() {
  return (
    <div className="filters mb-4 flex flex-wrap gap-2">
      <button className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition">All</button>
      <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition">Completed</button>
      <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition">Pending</button>
      <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition">In Progress</button>
    </div>
  );
}

const TaskItem = ({ title, status, project, dueDate, assignedTo, description }) => {
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editStatus, setEditStatus] = useState(status);
  const [editDescription, setEditDescription] = useState(description);

  const handleSave = () => {
    // Save logic here
    setIsEditing(false);
    setShowModal(false);
  };

  const handleCancel = () => {
    setEditStatus(status);
    setEditDescription(description);
    setIsEditing(false);
    setShowModal(false);
  };

  return (
    <>
      {/* Task Summary */}
      <div className="task-item p-4 bg-yellow-300 rounded-xl shadow-md mb-4 hover:shadow-lg transition-shadow duration-300">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-bold text-gray-800">{title}</h3>
            <p className="text-sm text-gray-600">Project: {project}</p>
            <p className="text-sm text-gray-600">Due: {dueDate}</p>
            <p className="text-sm text-gray-600">Assigned to: {assignedTo}</p>
          </div>
          <div className="flex flex-col items-start md:items-end gap-2">
             <span
        className={`px-3 py-1 text-xs font-semibold rounded-full ${
          status === 'Completed'
            ? 'bg-green-100 text-green-600'
            : status === 'In Progress'
            ? 'bg-yellow-100 text-yellow-600'
            : 'bg-red-100 text-red-600'
        }`}
      >
        {status}
      </span>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            onClick={() => setShowModal(true)}
          >
            View
          </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center  bg-black bg-opacity-40 backdrop-blur-sm transition-all">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 animate-fade-in">
            <h2 className="text-xl font-bold mb-4 text-blue-600">{title}</h2>

            {isEditing ? (
              <>
                <label className="block text-sm font-medium mb-1">Status</label>
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value)}
                  className="w-full mb-4 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                >
                  <option>Pending</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                </select>

                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  rows={4}
                  className="w-full mb-4 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                />
              </>
            ) : (
              <>
                <p className="text-sm mb-2"><strong>Status:</strong> {editStatus}</p>
                <p className="text-sm mb-4"><strong>Description:</strong> {editDescription}</p>
              </>
            )}

            <div className="flex justify-end gap-2">
              {isEditing ? (
                <>
                  <button
                    className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
                    onClick={handleSave}
                  >
                    Save
                  </button>
                  <button
                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );};



function Task() {
    const [tasks, setTasks] = useState([]);

  useEffect(() => {
    API.get('tasks/')
      .then((res) => setTasks(res.data))
      .catch((err) => console.error(err));

      console.log(tasks ,"tasks data");
  }, []);
  return (
    <div className="mx-auto">
      <div className="search mt-4 mb-6">
        <TaskCreateToggle />
        <input
          type="text"
          placeholder="Search tasks..."
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />
      </div>
      <Filters />
      <div className="taskitemslist">
        <table className="min-w-full divide-y divide-gray-200">
  <thead className="bg-gray-100">
    <tr>
      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Title</th>
      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Status</th>
      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Priority</th>
      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Due Date</th>
      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Assigned To</th>
      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Actions</th>
    </tr>
  </thead>
  <tbody className="divide-y divide-gray-100 bg-white">
    {tasks.map((task) => (
      <TaskItemRow
        key={task.id}
        title={task.title}
        status={task.status}
        priority={task.priority}
        dueDate={new Date(task.due_date).toLocaleDateString()}
        assignedTo={task.assigned_to_username}
        description={task.description}
      />
    ))}
  </tbody>
</table>


       
      
        
      </div>
    </div>
  );
}

export default Task;
export {TaskForm};



// src/components/TaskForm.js
// your Axios instance with JWT interceptor

function TaskForm() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'pending',
    priority: 'medium',
    due_date: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/tasks/', formData);
      alert('Task created successfully!');
      setFormData({
        title: '',
        description: '',
        status: 'pending',
        priority: 'medium',
        due_date: '',
      });
    } catch (error) {
      console.error('Error creating task:', error);
      alert('Failed to create task.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: 'auto' }}>
      <h2>Create New Task</h2>
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
      <button type="submit">Create Task</button>
    </form>
  );
}

// export default TaskForm;



const TaskItemRow = ({ title, status, priority, dueDate, assignedTo, description }) => {
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editStatus, setEditStatus] = useState(status);
  const [editDescription, setEditDescription] = useState(description);

  const handleSave = () => {
    // TODO: Add API call to update task
    setIsEditing(false);
    setShowModal(false);
  };

  const handleCancel = () => {
    setEditStatus(status);
    setEditDescription(description);
    setIsEditing(false);
    setShowModal(false);
  };

  return (
    <>
      <tr className="hover:bg-yellow-50 transition">
        <td className="px-4 py-2 text-sm text-gray-800 font-medium">{title}</td>
        <td className="px-4 py-2 text-sm">
          <span
            className={`px-2 py-1 rounded-full text-xs font-semibold ${
              status === 'Completed'
                ? 'bg-green-100 text-green-700'
                : status === 'In Progress'
                ? 'bg-yellow-100 text-yellow-700'
                : 'bg-red-100 text-red-600'
            }`}
          >
            {status}
          </span>
        </td>
        <td className="px-4 py-2 text-sm">
          <span
            className={`px-2 py-1 rounded-full text-xs font-semibold capitalize ${
              priority === 'high'
                ? 'bg-red-100 text-red-700'
                : priority === 'medium'
                ? 'bg-yellow-100 text-yellow-700'
                : 'bg-green-100 text-green-700'
            }`}
          >
            {priority}
          </span>
        </td>
        <td className="px-4 py-2 text-sm text-gray-700">{dueDate}</td>
        <td className="px-4 py-2 text-sm text-gray-700">{assignedTo}</td>
        <td className="px-4 py-2 text-sm">
          <button
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => setShowModal(true)}
          >
            View
          </button>
        </td>
      </tr>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 animate-fade-in">
            <h2 className="text-xl font-bold mb-4 text-blue-600">{title}</h2>

            {isEditing ? (
              <>
                <label className="block text-sm font-medium mb-1">Status</label>
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value)}
                  className="w-full mb-4 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                >
                  <option>Pending</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                </select>

                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  rows={4}
                  className="w-full mb-4 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                />
              </>
            ) : (
              <>
                <p className="text-sm mb-2"><strong>Status:</strong> {editStatus}</p>
                <p className="text-sm mb-2"><strong>Priority:</strong> {priority}</p>
                <p className="text-sm mb-4"><strong>Description:</strong> {editDescription}</p>
              </>
            )}

            <div className="flex justify-end gap-2">
              {isEditing ? (
                <>
                  <button
                    className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
                    onClick={handleSave}
                  >
                    Save
                  </button>
                  <button
                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );};

export {TaskItemRow};
