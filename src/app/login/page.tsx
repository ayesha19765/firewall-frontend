"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Import Image component for optimized image loading

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState('user'); // New state for role selection

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic based on the role
    console.log('Logging in as', role, 'with', email, password);
  };

  return (
    <div className="flex justify-center items-center p-8 h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <div className="flex justify-center mb-6">
          <div className="bg-blue-500 p-4 rounded-full">
            <span className="text-white text-2xl font-bold">🔒</span>
          </div>
        </div>
        <h2 className="text-2xl text-center font-bold text-gray-700 mb-4">Cloud Console</h2>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Role</label>
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="user"
                  checked={role === 'user'}
                  onChange={() => setRole('user')}
                  className="form-radio text-blue-500"
                />
                <span className="ml-2">User</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="admin"
                  checked={role === 'admin'}
                  onChange={() => setRole('admin')}
                  className="form-radio text-blue-500"
                />
                <span className="ml-2">Admin</span>
              </label>
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                <Image
                  src={showPassword ? '/eye.png' : '/hidden.png'}
                  alt={showPassword ? 'Hide password' : 'Show password'}
                  width={20}
                  height={20}
                />
              </button>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Log in
            </button>
          </div>
        </form>

        <div className="mt-4 text-center">
          <Link href="/forgot-password" className="text-blue-500 hover:text-blue-700">
            Forgot your password?
          </Link>
        </div>

        <div className="mt-4 text-center">
          <span>Don't have an account?</span>{' '}
          <Link href="/signup" className="text-blue-500 hover:text-blue-700">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
