'use client';

import axios from 'axios';
import Link from 'next/link';
import { useState } from 'react';
export default function Home() {
  const accountURL = 'http://localhost:8080/api';

  const [name, setName] = useState('');
  // const { userId, setUserId, setAccountId } = useAuth()

  const createUser = async () => {
    const payload = { name };
    const response = await axios.post(`${accountURL}/users`, payload);
    const data = await response.data;

    // setUserId(data.id)
    console.log(response.data);
    localStorage.setItem('userId', data.id);
  };

  const createAccount = async () => {
    const userId = localStorage.getItem('userId');
    const payload = { userId };
    const response = await axios.post(`${accountURL}/accounts`, payload);
    const data = await response.data;
    // setAccountId(data.accountId)
    console.log(response.data);
    localStorage.setItem('accountId', data.accountId);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <Link href="/workspace" className="mb-6 text-blue-600 hover:underline">
        Go to Workspace
      </Link>

      <div className="w-full max-w-sm bg-white rounded-lg shadow p-6">
        <h1 className="text-xl font-semibold mb-4 text-center">Create Account</h1>

        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex flex-col gap-2">
          <button
            onClick={createUser}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Create
          </button>
          <button
            onClick={createAccount}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Claim Account
          </button>
        </div>
      </div>
    </div>
  );
}
