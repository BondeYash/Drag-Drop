import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export default function SortableItem({ item }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: item._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: 12,
    border: '1px solid #e5e7eb',
    borderRadius: 6,
    marginBottom: 8,
    background: 'white'
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div style={{ fontWeight: 600 }}>{item.title}</div>
      <div style={{ color: '#6b7280' }}>{item.description}</div>
    </div>
  );
}
