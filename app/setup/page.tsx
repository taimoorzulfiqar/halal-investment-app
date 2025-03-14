'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SetupPage() {
  const [setupKey, setSetupKey] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSetup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple security check - require a setup key
    if (setupKey !== process.env.NEXT_PUBLIC_SETUP_KEY) {
      setStatus('error');
      setMessage('Invalid setup key');
      return;
    }

    setStatus('loading');
    try {
      const response = await fetch('/api/setup/create-admin', {
        method: 'POST'
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setStatus('success');
        setMessage(`Admin user created successfully: ${data.email}`);
        // Redirect to login after 2 seconds
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      } else {
        throw new Error(data.error || 'Failed to create admin user');
      }
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'An error occurred');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Initial Setup
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Create the first admin user
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSetup}>
          <div>
            <label htmlFor="setupKey" className="sr-only">
              Setup Key
            </label>
            <input
              id="setupKey"
              name="setupKey"
              type="password"
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Setup Key"
              value={setupKey}
              onChange={(e) => setSetupKey(e.target.value)}
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={status === 'loading'}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                status === 'loading'
                  ? 'bg-blue-400'
                  : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
              }`}
            >
              {status === 'loading' ? 'Setting up...' : 'Create Admin User'}
            </button>
          </div>

          {message && (
            <div
              className={`mt-2 text-sm text-center ${
                status === 'success' ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
