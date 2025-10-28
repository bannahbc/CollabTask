

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { showError, showSuccess } from '../../utils/Alert/SweetAlert';
const Button = ({ children, onClick, className }) => (
  <button
    onClick={onClick}
    className={`py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded text-white font-semibold transition duration-200 ${className}`}
  >
    {children}
  </button>
);

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (isLogin) {
        const res = await axios.post('http://localhost:8000/auth/login/', {
          email: formData.email,
          password: formData.password,
        });
        localStorage.setItem('access', res.data.access);
        localStorage.setItem('refresh', res.data.refresh);
        localStorage.setItem('email', JSON.stringify(res.data.email));
        localStorage.setItem('username', JSON.stringify(res.data.username));
        // alert('Login successful!');
        showSuccess('Login successful!');
        console.log(res.data);
        navigate('/dashboard');
      } else {
        await axios.post('http://localhost:8000/auth/register/', formData);
        // alert('Registration successful! You can now log in.');
        showSuccess('Registration successful! You can now log in.');
        setIsLogin(true);
      }
    } catch (err) {
      console.log(err.response.data);
      showError(err.response.data.error || 'Something went wrong');
      // setError(err.response?.data?.detail || 'Something went wrong');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white relative overflow-hidden">
  {/* Top Nav */}
  <div className="absolute top-0 left-0 w-full h-16 flex items-center justify-center z-10">
    <div className="text-3xl font-extrabold text-indigo-400 cursor-pointer tracking-wide">
      Collab Task
    </div>
  </div>

  {/* Form Container */}
  <div className="flex justify-center items-center min-h-screen pt-20 px-4">
    <div className="bg-white/10 backdrop-blur-md border border-white/20 shadow-xl p-8 rounded-2xl w-full max-w-md transition-all duration-500 ease-in-out">
      <h2 className="text-3xl font-bold mb-6 text-center tracking-tight text-white">
        {isLogin ? 'Login to Your Account' : 'Create an Account'}
      </h2>

      <form className="space-y-5" onSubmit={handleSubmit}>
        {!isLogin && (
          <div>
            <label htmlFor="username" className="block mb-1 text-sm font-medium text-indigo-100">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-white/70"
              required
              placeholder="Enter username"
            />
          </div>
        )}

        <div>
          <label htmlFor="email" className="block mb-1 text-sm font-medium text-indigo-100">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-white/70"
            required
            placeholder="Enter email"
          />
        </div>

        <div>
          <label htmlFor="password" className="block mb-1 text-sm font-medium text-indigo-100">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-white/70"
            required
            placeholder="Enter password"
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 transition text-white font-semibold py-2 rounded"
        >
          {isLogin ? 'Login' : 'Register'}
        </Button>

        {error && <p className="text-red-400 text-sm mt-2 text-center">{error}</p>}
      </form>

      <div className="mt-6 text-center">
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="text-indigo-300 hover:text-white hover:underline text-sm transition"
        >
          {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
        </button>
      </div>
    </div>
  </div>
</div>


  );
}

export default Login;
