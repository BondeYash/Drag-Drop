import React, { useState } from 'react';
import api from '../axiosApi/api.js';
import { useNavigate } from 'react-router-dom';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handle = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/auth/login', { email });
      onLogin(data.user);
      navigate('/items');
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: 480, margin: '0 auto' }}>
        <h2>Email login</h2>
        <form onSubmit={handle}>
          <input value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" className="w-full p-2 mb-2" />
          <button className="p-2 bg-blue-600 text-white rounded cursor-pointer">Login / Register</button>
        </form>
      </div>
    </div>
  );
}
