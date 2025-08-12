import React, { useEffect, useState } from 'react';
import api from '../axiosApi/api.js';
import SortableItem from '../components/SortableItem';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';

export default function ItemsPage({ user, onRequireLogin }) {
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  const sensors = useSensors(useSensor(PointerSensor));

  useEffect(() => {
    fetchItems();
  }, []);

  async function fetchItems(){
    try {
      const { data } = await api.get('/items');
      setItems(data);
    } catch (err) {
      console.error(err);
      if (err.response && err.response.status === 401){
        onRequireLogin();
      }
    }
  }

  async function addItem(){
    if (!title) return alert('Title required');
    const { data } = await api.post('/items', { title, description: desc });
    setItems(prev => [...prev, data]);
    setTitle(''); setDesc('');
  }

  async function handleDragEnd(event){
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = items.findIndex(i => i._id === active.id);
    const newIndex = items.findIndex(i => i._id === over.id);
    const newArray = arrayMove(items, oldIndex, newIndex);

    
    setItems(newArray);

    
    const updates = newArray.map((it, idx) => ({ _id: it._id, order: idx }));
    try {
      await api.put('/items/reorder', { items: updates });
    } catch (err) {
      console.error('reorder failed', err);
      
      await fetchItems();
    }
  }

  async function logout(){
    await api.post('/auth/logout').catch(()=>{});
    window.location = '/';
  }

  return (
    <div className="container p-2 m-2 px-4text-xl">
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
        <h1>Your Items</h1>
        <button onClick={logout} className='bg-slate-500 p-2 px-4 rounded-xl cursor-pointer'>Logout</button>
      </div>

      <div className="card" style={{ marginBottom: 12 }}>
        <input placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} className="p-2 mr-2" />
        <input placeholder="Description" value={desc} onChange={e=>setDesc(e.target.value)} className="p-2 mr-2" />
        <button  className= "bg-slate-400 rounded-xl p-2 px-4" onClick={addItem}>Add</button>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items.map(i => i._id)} strategy={verticalListSortingStrategy}>
          {items.map(item => <SortableItem key={item._id} item={item} />)}
        </SortableContext>
      </DndContext>
    </div>
  );
}
