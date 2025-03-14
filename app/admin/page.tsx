'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Tab } from '@headlessui/react';
import UserManagement from './components/UserManagement';
import ReviewRequests from './components/ReviewRequests';

export default function AdminDashboard() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check if user is admin
    const checkAdmin = async () => {
      const res = await fetch('/api/auth/check-admin');
      if (!res.ok) {
        router.push('/');
        return;
      }
      setIsAdmin(true);
    };
    checkAdmin();
  }, [router]);

  if (!isAdmin) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1 mb-8">
          <Tab className={({ selected }) =>
            `w-full rounded-lg py-2.5 text-sm font-medium leading-5
             ${selected 
               ? 'bg-white text-blue-700 shadow'
               : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'}`
          }>
            User Management
          </Tab>
          <Tab className={({ selected }) =>
            `w-full rounded-lg py-2.5 text-sm font-medium leading-5
             ${selected 
               ? 'bg-white text-blue-700 shadow'
               : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'}`
          }>
            Review Requests
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <UserManagement />
          </Tab.Panel>
          <Tab.Panel>
            <ReviewRequests />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
