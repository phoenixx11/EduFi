// src/app/register/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

// Dynamically import Avatar component to prevent hydration errors
const Avatar = dynamic(
  () => import('@coinbase/onchainkit/identity').then((mod) => mod.Avatar),
  { ssr: false }
);

const RegisterPage: React.FC = () => {
  const router = useRouter();

  // Form state
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const { username, email, password, confirmPassword } = formData;

    // Basic validation
    if (!username || !email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    // Further validations can be added here (e.g., email format, password strength)

    setIsSubmitting(true);

    try {
      // TODO: Implement actual registration logic (e.g., API call to backend)
      // For demonstration, we'll simulate a successful registration with a timeout

      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate network delay

      setSuccess('Registration successful! Redirecting to dashboard...');

      // Optionally, redirect to dashboard after a delay
      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);
    } catch (err: any) {
      console.error('Registration error:', err);
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold text-center mb-6">Register</h1>

      <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-gray-700 mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Registering...' : 'Register'}
          </button>
        </form>

        <p className="mt-4 text-center">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-500 underline">
            Login here
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
