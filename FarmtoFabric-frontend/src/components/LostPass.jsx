import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

export default function LostPass() {
  const [username, setUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate password match
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    const data = {
        username,
        newPassword,
        role
    }

    axios.post("http://localhost:5000/pass",data)
    .then((res) =>{
        alert("updated")
        navigate('/login')
        setUsername("")
        setNewPassword("")
        setConfirmPassword("")
        setRole("")
    })
    .catch((rej) =>{
        console.log('error msg :'+rej)
        console.log(rej)
    })
  };

  return (
    <div className='flex justify-center mt-24'>
      <div className="relative p-4 md:w-1/2 w-full max-h-full">
        <div className="relative bg-white rounded-lg shadow-xl">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
            <h3 className="text-xl font-semibold text-gray-90">
              Forgot Password
            </h3>
            <Link to={'/'}>
              <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center">
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </Link>
          </div>

          <div className="p-4 md:p-5">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="uname" className="block mb-2 text-sm font-medium text-gray-900">Your Username</label>
                <input 
                  type="text" 
                  name="text" 
                  id="uname" 
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" 
                  placeholder="abc123" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required 
                />
              </div>
              <div>
                <label htmlFor="newPassword" className="block mb-2 text-sm font-medium text-gray-900">New Password</label>
                <input 
                  type="password" 
                  name="newPassword" 
                  id="newPassword" 
                  placeholder="••••••••" 
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" 
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900">Re-enter Password</label>
                <input 
                  type="password" 
                  name="confirmPassword" 
                  id="confirmPassword" 
                  placeholder="••••••••" 
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <div className='flex justify-between'>
                <select 
                  className='border-gray-300 border p-2 text-sm rounded-lg'
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required 
                >
                  <option value="" hidden>Select Role</option>
                  <option value="ServiceProvider">Service Provider</option>
                  <option value="Farmer">Farmer</option>
                  <option value="User">User</option>
                </select>
              </div>
              <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                Change Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
