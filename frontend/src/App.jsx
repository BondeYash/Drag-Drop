import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import ItemsPage from './pages/ItemsPage';

export default function App(){
  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login onLogin={setUser} />} />
        <Route path="/items" element={<ItemsPage user={user} onRequireLogin={() => window.location = '/'} />} />
      </Routes>
    </BrowserRouter>
  );
}
