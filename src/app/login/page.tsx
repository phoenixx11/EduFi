// src/app/login/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

// Dynamically import ConnectWallet to prevent hydration errors
const ConnectWallet = dynamic(
  () => import('@coinbase/onchainkit/wallet').then((mod) => mod.ConnectWallet),
  { ssr: false }
);

// Define TypeScript interfaces for form data and responses
interface LoginFormData {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const router = useRouter();

  // Form state
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });

  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Handle input changes
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

    const { email, password } = formData;

    // Basic validation
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);

    try {
      // TODO: Replace the following with actual API call to your backend for authentication
      // For demonstration, we'll simulate a successful login with a timeout

      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate network delay

      // Simulate successful login and redirect to dashboard
      router.push('/dashboard');
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <h1 className="text-3xl font-semibold text-center mb-6">Login</h1>

      {/* Login Form */}
      <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Email Field */}
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

          {/* Password Field */}
          <div className="mb-6">
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

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Alternative Login Methods */}
        <div className="mt-6 text-center">
          <p className="mb-4">Or connect your wallet to login:</p>
          <ConnectWallet />
        </div>

        {/* Link to Registration Page */}
        <p className="mt-6 text-center">
          Don't have an account?{' '}
          <Link href="/register" className="text-blue-500 underline">
            Register here
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
