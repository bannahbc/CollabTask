import React,{useState} from 'react';
import { useEffect } from 'react';
import API from '../../api/axios';
import api from '../../api/axios'; 
import { TaskCreateToggle } from './TaskCreator';
import StatusChart from '../Chart/Chart';
import { showSuccess, showWarning } from '../../utils/Alert/SweetAlert';
import { TaskViewModal,TaskEditModal } from './TaskView';

import useTaskSocket from '../../utils/Websocket/websocket';

function Filters({ onFilterChange, activeFilter }) {
  const filters = ['all', 'pending', 'in-progress', 'completed'];

  return (
    <div className="filters mb-4 flex flex-wrap gap-2">
      {filters.map((f) => (
        <button
          key={f}
          onClick={() => onFilterChange(f)}
          className={`px-4 py-2 rounded-lg transition inset-shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out ${
            activeFilter === f
              ? 'bg-cyan-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {f.charAt(0).toUpperCase() + f.slice(1).replace('-', ' ')}
        </button>
      ))}
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
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(false);
  const [allTasks, setAllTasks] = useState([]);

  const [viewModalTask, setViewModalTask] = useState(null);
  const [editModalTask, setEditModalTask] = useState(null);

  const totalCounts = {
    completed: allTasks.filter(t => t.status === 'completed').length,
    in_progress: allTasks.filter(t => t.status === 'in-progress').length,
    pending: allTasks.filter(t => t.status === 'pending').length,
  };

  const refreshTasks = () => {
    setLoading(true);
    const url = filter === 'all' ? 'tasks/' : `tasks/?status=${filter}`;
    API.get(url)
      .then((res) => {
        setTimeout(() => {
          setTasks(res.data);
          if (filter === 'all') setAllTasks(res.data);
          setLoading(false);
        }, 300);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };
  // WebSocket for real-time updates
  // useTaskSocket(localStorage.getItem('access'), () => {
  //   refreshTasks();
  // });
  const jwtToken = localStorage.getItem('access');
  useEffect(() => {
  const socket = new WebSocket(`ws://localhost:8000/ws/tasks/?token=${jwtToken}`);
  // alert("WebSocket connected for real-time task updates.");

  socket.onmessage = (event) => {

    const data = JSON.parse(event.data);
    console.log("WebSocket message received:", data);
    // alert(`WebSocket message received: ${data.action}`);
    if (data.action === "created" || data.action === "updated") {
      refreshTasks(); // reload task list
    }
  };

  return () => socket.close();
}, [jwtToken]);



  useEffect(() => {
    refreshTasks();
  }, [filter]);

  return (
    <div className="relative mx-auto">
      <div className="search mt-4 mb-6 flex flex-col gap-4">
        <TaskCreateToggle onTaskCreated={() => refreshTasks()} />
        <StatusChart completed={totalCounts.completed} inProgress={totalCounts.in_progress} pending={totalCounts.pending} />
        <Filters onFilterChange={setFilter} activeFilter={filter} />
      </div>

      <div className={`relative mb-20 transition-opacity duration-300 ${viewModalTask || editModalTask ? 'blur-sm pointer-events-none' : ''}`}>
        {tasks.length === 0 ? (
          <p className="text-center text-gray-500 bg-gray-50 shadow-md p-5 rounded-lg">
            No tasks found.
          </p>
        ) : (
          <div className="overflow-x-auto shadow-lg rounded-lg">
            <table className="table-auto min-w-full divide-y divide-gray-200 border">
              <thead className="bg-gray-100 shadow-md">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Title</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Status</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Priority</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Due Date</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Assigned To</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className={`divide-y divide-gray-100 bg-white ${loading ? 'opacity-50' : 'opacity-100'}`}>
                {tasks.map((task) => (
                  <TaskItemRow
                    key={task.id}
                    task={task}
                    onView={() => setViewModalTask(task)}
                    onEdit={() => setEditModalTask(task)}
                    onTaskUpdated={refreshTasks}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* View Modal */}
      {viewModalTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
          <TaskViewModal
            {...viewModalTask}
            onClose={() => setViewModalTask(null)}
            onEdit={() => {
              setEditModalTask(viewModalTask);
              setViewModalTask(null);
            }}
          />
        </div>
      )}

      {/* Edit Modal */}
      {editModalTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
          <TaskEditModal
            {...editModalTask}
            onClose={() => setEditModalTask(null)}
            onTaskUpdated={refreshTasks}
          />
        </div>
      )}
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



// const TaskItemRow = ({
//   taskId,
//   title,
//   status,
//   priority,
//   dueDate,
//   assignedTo,
//   description,
//   collaborators,
//   onTaskUpdated, // optional callback to refresh parent
// }) => {
//   console.log("Rendering TaskItemRow for task:", taskId);
//   const [showModal, setShowModal] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);

//   const [editTitle, setEditTitle] = useState(title);
//   const [editStatus, setEditStatus] = useState(status);
//   const [editPriority, setEditPriority] = useState(priority);
//   const [editDueDate, setEditDueDate] = useState(() => {
//   if (!dueDate) return '';
//   const iso = new Date(dueDate).toISOString();
//   return iso.split('T')[0]; // returns YYYY-MM-DD
// });
// const [editDescription, setEditDescription] = useState(description);
// const hasChanges =
//   editTitle !== title ||
//   editStatus !== status ||
//   editPriority !== priority ||
//   editDueDate !== new Date(dueDate).toISOString().split('T')[0] ||
//   editDescription !== description;



//   const handleSave = async () => {
//   try {
//     await api.put(`/tasks/update/${taskId}/`, {
//       title: editTitle,
//       status: editStatus,
//       priority: editPriority,
//       due_date: editDueDate,
//       description: editDescription,
//     });

//     setIsEditing(false);
//     setShowModal(false);

//     if (onTaskUpdated) {
//       onTaskUpdated(); // refresh parent table
//     }
//   } catch (error) {
//     console.error('Error updating task:', error);
//     alert('Failed to update task.');
//   }
// };


//   const handleCancel = () => {
//     setEditTitle(title);
//     setEditStatus(status);
//     setEditPriority(priority);
//     setEditDueDate(dueDate);
//     setEditDescription(description);
//     setIsEditing(false);
//     setShowModal(false);
//   };
//   const DeleteTask = async () => {
//     const confirmDelete =await showWarning(
//   "This action cannot be undone.",
//   "delete this task"
// );
//     if (!confirmDelete) return;
//     try {
      
//       await api.delete(`/tasks/delete/${taskId}/`);
//       showSuccess('Task deleted successfully!');
//       // alert('Task deleted successfully!');
//       if (onTaskUpdated) {
//         onTaskUpdated(); // refresh parent table
//       }
//     } catch (error) {
//       console.error('Error deleting task:', error);
//       alert('Failed to delete task.');
//     }
//   };

//   return (
//    <>
//   <tr className="hover:bg-blue-50 hover:shadow-md transition duration-200">
//     <td className="px-4 py-2 text-sm text-gray-800 font-medium">{title}</td>
//     <td className="px-4 py-2 text-sm">
//       <span className={`px-2 py-1 rounded-full text-xs font-semibold capitalize ${
//         status === 'completed' ? 'bg-green-100 text-green-700' :
//         status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
//         'bg-red-100 text-red-600'
//       }`}>
//         {status}
//       </span>
//     </td>
//     <td className="px-4 py-2 text-sm">
//       <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
//         priority === 'high' ? 'bg-red-100 text-red-700' :
//         priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
//         'bg-green-100 text-green-700'
//       }`}>
//         {priority}
//       </span>
//     </td>
//     <td className="px-4 py-2 text-sm text-gray-700">{dueDate}</td>
//     <td className="px-4 py-2 text-sm text-gray-700">{assignedTo}</td>
//     <td className="px-4 py-2 text-sm flex gap-2 group">
//       <button
//         className="px-3 py-1 bg-blue-500 text-white rounded hover:shadow-md hover:bg-blue-600"
//         onClick={() => setShowModal(true)}
//       >
//         View
//       </button>
//       <button
//         onClick={DeleteTask}
//         className="px-3 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600"
//       >
//         Delete
//       </button>
//     </td>
//   </tr>

//   {showModal && (
//     <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-md flex items-center justify-center">
//     <div className="w-full h-full flex items-center justify-center p-4">
//       <div className="w-full max-w-xl bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl p-6 overflow-y-auto max-h-[90vh]">
//           <h2 className="text-2xl font-bold mb-6 text-blue-600 text-center">{title}</h2>

//           {isEditing ? (
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
//                 <input
//                   type="text"
//                   value={editTitle}
//                   onChange={(e) => setEditTitle(e.target.value)}
//                   className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
//                 <select
//                   value={editStatus}
//                   onChange={(e) => setEditStatus(e.target.value)}
//                   className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 >
//                   <option value="pending">Pending</option>
//                   <option value="in-progress">In Progress</option>
//                   <option value="completed">Completed</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
//                 <select
//                   value={editPriority}
//                   onChange={(e) => setEditPriority(e.target.value)}
//                   className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 >
//                   <option value="low">Low</option>
//                   <option value="medium">Medium</option>
//                   <option value="high">High</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
//                 <input
//                   type="date"
//                   value={editDueDate}
//                   onChange={(e) => setEditDueDate(e.target.value)}
//                   className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
//                 <textarea
//                   value={editDescription}
//                   onChange={(e) => setEditDescription(e.target.value)}
//                   rows={4}
//                   className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 />
//               </div>
//             </div>
//           ) : (
//             <div className="space-y-2 text-sm text-gray-700">
//               <p><strong>Status:</strong> {editStatus}</p>
//               <p><strong>Priority:</strong> {editPriority}</p>
//               <p><strong>Due Date:</strong> {editDueDate}</p>
//               <p><strong>Description:</strong> {editDescription}</p>
//             </div>
//           )}

//           <div className="flex justify-end gap-2 mt-6">
//             {isEditing ? (
//               <>
//                 <button
//                   className={`px-4 py-2 rounded-lg transition ${
//                     hasChanges
//                       ? 'bg-indigo-500 text-white hover:bg-indigo-600'
//                       : 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                   }`}
//                   onClick={handleSave}
//                   disabled={!hasChanges}
//                 >
//                   Save
//                 </button>
//                 <button
//                   className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
//                   onClick={handleCancel}
//                 >
//                   Cancel
//                 </button>
//               </>
//             ) : (
//               <>
//                 <button
//                   className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
//                   onClick={() => setIsEditing(true)}
//                 >
//                   Edit
//                 </button>
//                 <button
//                   className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
//                   onClick={() => setShowModal(false)}
//                 >
//                   Close
//                 </button>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   )}
// </>
//   );
// } 



const TaskItemRow = ({ task, onView, onEdit, onTaskUpdated }) => {
  const { id, title, status, priority, due_date, collaborators, description } = task;

  const DeleteTask = async () => {
    const confirmDelete = await showWarning("This action cannot be undone.", "delete this task");
    if (!confirmDelete) return;

    try {
      await api.delete(`/tasks/delete/${id}/`);
      showSuccess("Task deleted successfully!");
      if (onTaskUpdated) onTaskUpdated();
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Failed to delete task.");
    }
  };

  return (
    <tr className="hover:bg-blue-50 hover:shadow-md transition duration-200">
      <td className="px-4 py-2 text-sm text-gray-800 font-medium">{title}</td>
      <td className="px-4 py-2 text-sm">
        <span className={`px-2 py-1 rounded-full text-xs font-semibold capitalize ${
          status === "completed" ? "bg-green-100 text-green-700"
          : status === "in-progress" ? "bg-blue-100 text-blue-700"
          : "bg-red-100 text-red-600"
        }`}>
          {status}
        </span>
      </td>
      <td className="px-4 py-2 text-sm">
        <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
          priority === "high" ? "bg-red-100 text-red-700"
          : priority === "medium" ? "bg-yellow-100 text-yellow-700"
          : "bg-green-100 text-green-700"
        }`}>
          {priority}
        </span>
      </td>
      <td className="px-4 py-2 text-sm text-gray-700">{new Date(due_date).toLocaleDateString()}</td>
      <td className="px-4 py-2 text-sm text-gray-700">
        <div className="flex -space-x-3">
          {collaborators.map((user, index) => (
            <div
              key={user.id}
              className="w-8 h-8 rounded-full bg-cyan-600 text-white flex items-center justify-center text-sm font-semibold border-2 border-white shadow-md"
              style={{ zIndex: collaborators.length - index }}
              title={user.username}
            >
              {user.username.charAt(0).toUpperCase()}
            </div>
          ))}
        </div>
      </td>
      <td className="px-4 py-2 text-sm flex gap-2">
        <button
          className="px-3 py-1 bg-blue-500 text-white rounded hover:shadow-md hover:bg-blue-600"
          onClick={onView}
        >
          View
        </button>
        <button
          className="px-3 py-1 bg-red-500 text-white rounded hover:shadow-md hover:bg-red-600"
          onClick={DeleteTask}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export {TaskItemRow};
