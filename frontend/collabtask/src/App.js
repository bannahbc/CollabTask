import logo from './logo.svg';
import './App.css';
import Login from './components/Auth/login';
import Sidebar from './components/Navbar/Navbar';
import { BrowserRouter } from 'react-router-dom';
import Task from './components/Task/Task';

function App() {
  return (
    <BrowserRouter>
    <div className="App flex h-screen font-extrabold tracking-wide bg-gray-200">  
      {/* <Login  className="bg-gray-600 min-h-screen flex items-center justify-center" /> */}
      <Sidebar />
      
        {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-6 overflow-auto">
        <h1 className="text-3xl font-bold mb-4">Tasks</h1>
        <hr />
          <Task />
       
      </div>
      {/* <Login /> */}
    </div>
    </BrowserRouter>
  );
}

export default App;
