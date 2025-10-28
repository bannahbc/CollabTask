import logo from './logo.svg';
import './App.css';
import Login from './components/Auth/login';
import Sidebar from './components/Navbar/Navbar';
import { BrowserRouter,Route,Routes,Navigate} from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Task from './components/Task/Task';
import Settings from './components/Settings/Settings';
import { Children } from 'react';

{/* <Login  className="bg-gray-600 min-h-screen flex items-center justify-center" /> */}

function Dashboard({Children,title}) {
  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-200 font-sans">
      <Sidebar />
      <main className="flex-1 bg-gray-100 p-6 overflow-auto">
        <h1 className="text-3xl font-extrabold text-gray-800 tracking-wide mb-4">{title}</h1>
        <hr className="mb-4" />

        {Children}
      </main>
    </div>
  );
}


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        {/* <Route path="/register" element={<Register />} /> */}

        {/* Protected Routes with Sidebar */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard Children={<Task />} title={"Dashboard"} />
            </PrivateRoute>
          }
        />
        <Route
          path="/tasks"
          element={
            <PrivateRoute>
              <Dashboard Children={<Task />} title={"Tasks"} />
            </PrivateRoute>
          }
        />
        {/* <Route
          path="/tasks"
          element={
            <PrivateRoute>
              <TaskPage />
            </PrivateRoute>
          }
        /> */}
        <Route
          path="/settings"
          element={
            <PrivateRoute>
              <Dashboard Children={<Settings />} title={"Settings"} />
            </PrivateRoute>
          }
        />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
