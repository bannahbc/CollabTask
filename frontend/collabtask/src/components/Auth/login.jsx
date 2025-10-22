

import React, { useState } from 'react';
import axios from 'axios';

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
        alert('Login successful!');
      } else {
        await axios.post('http://localhost:8000/auth/register/', formData);
        alert('Registration successful! You can now log in.');
        setIsLogin(true);
      }
    } catch (err) {
      setError(err.response?.data?.detail || 'Something went wrong');
    }
  };

  return (
    <div className="container mx-auto px-4">
      <div className="navtop absolute top-0 left-0 w-full flex items-center justify-center h-16 bg-white shadow-md">
        <div className="text-3xl font-extrabold text-blue-600 cursor-pointer">Collab Task</div>
      </div>
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-blue-800 p-8 rounded-lg shadow-lg w-full max-w-md text-white shadow-2xl shadow-gray-900">
          <h2 className="text-2xl font-bold mb-6 text-center">
            {isLogin ? 'Login Page' : 'Register Page'}
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            {!isLogin && (
              <div>
                <label htmlFor="username" className="block mb-1 text-sm font-medium">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded bg-gray-300 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            )}
            <div>
              <label htmlFor="email" className="block mb-1 text-sm font-medium">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block mb-1 text-sm font-medium">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              {isLogin ? 'Login' : 'Register'}
            </Button>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </form>
          <div className="mt-4 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-white hover:underline text-sm"
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
