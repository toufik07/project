import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = () => {
  const [activeForm, setActiveForm] = useState('user1'); // Default to User 1 login form
  const [isSignup, setIsSignup] = useState(false); // State to toggle signup
  const [selectedUser, setSelectedUser] = useState(''); // State for dropdown selection
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleToggle = (form) => {
    if (!isSignup) {
      setActiveForm(form); // Set the active login form only if not signing up
    }
  };

  const handleSignupToggle = () => {
    setIsSignup(!isSignup); // Toggle signup state
    if (!isSignup) {
      setActiveForm('user1'); // Set to User 1 login form when going back to login
    }
  };

  const handleUserChange = (e) => {
    setSelectedUser(e.target.value); // Update selected user from dropdown
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/api/${activeForm}/login`, {
        username: formData.username,
        password: formData.password,
      });
      // Handle login success (e.g., redirect, store JWT token, etc.)
      console.log('Login successful:', response.data);
      alert("login successfully")
    } catch (error) {
      setErrorMessage('Login failed. Please check your credentials.');
      console.error(error);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/api/${selectedUser}/signup`, {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
      // Handle signup success (e.g., redirect, store JWT token, etc.)
      console.log('Signup successful:', response.data);
    } catch (error) {
      setErrorMessage('Signup failed. Please try again.');
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="relative w-full max-w-xl p-12 bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Welcome</h1>
          <p className="text-gray-600">Please {isSignup ? 'sign up' : 'log in'} to continue</p>
        </div>

        {/* Show user selection buttons only when not signing up */}
        {!isSignup && (
          <div className="flex mb-4">
            <button
              onClick={() => handleToggle('user1')}
              className={`flex-1 py-3 text-lg font-semibold rounded-l-lg transition-all duration-300 ${
                activeForm === 'user1' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-gray-200 text-gray-700'
              }`}
            >
              User
            </button>
            <button
              onClick={() => handleToggle('user2')}
              className={`flex-1 py-3 text-lg font-semibold transition-all duration-300 ${
                activeForm === 'user2' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-gray-200 text-gray-700'
              }`}
            >
              Farmer
            </button>
            <button
              onClick={() => handleToggle('user3')}
              className={`flex-1 py-3 text-lg font-semibold rounded-r-lg transition-all duration-300 ${
                activeForm === 'user3' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-gray-200 text-gray-700'
              }`}
            >
              Service Provider
            </button>
          </div>
        )}

        <div className="relative">
          {/* Error message display */}
          {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

          {/* Signup Form */}
          {isSignup && (
            <div className="transition-all duration-500 mb-4">
              <form className="w-full" onSubmit={handleSignup}>
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Sign Up</h2>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="Username"
                  className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 shadow-sm"
                  required
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 shadow-sm"
                  required
                />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Password"
                  className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 shadow-sm"
                  required
                />
                <select
                  value={selectedUser}
                  onChange={handleUserChange}
                  className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 shadow-sm"
                  required
                >
                  <option value="" disabled>
                    Select User Role
                  </option>
                  <option value="user1">User</option>
                  <option value="user2">Farmer</option>
                  <option value="user3">Service Provider</option>
                </select>
                <button className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 shadow-md">
                  Sign Up
                </button>
              </form>
            </div>
          )}

          {/* Login Forms */}
          {!isSignup && (
            <>
              {['user1', 'user2', 'user3'].map((role) => (
                activeForm === role && (
                  <div key={role} className="mb-4">
                    <form className="w-full" onSubmit={handleLogin}>
                      <h2 className="text-2xl font-bold mb-4 text-gray-800">
                        Login {role === 'user1' ? 'User' : role === 'user2' ? 'Farmer' : 'Service Provider'}
                      </h2>
                      <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        placeholder="Username"
                        className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 shadow-sm"
                        required
                      />
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Password"
                        className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 shadow-sm"
                        required
                      />
                      <button className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 shadow-md">
                        Login
                      </button>
                    </form>
                  </div>
                )
              ))}
            </>
          )}
        </div>

        {/* Toggle Signup/Login */}
        <button
          onClick={handleSignupToggle}
          className="mt-4 w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 shadow-md"
        >
          {isSignup ? 'Back to Login' : 'Sign Up'}
        </button>
      </div>
    </div>
  );
};

const App = () => {
  return <LoginForm />;
};

export default App;
