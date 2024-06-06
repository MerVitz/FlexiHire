/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// src/components/AdminSidebar.jsx
import React from 'react';
import './styles/adminsidebar.css';

function AdminSidebar({ onSelect }) {
  return (
    <div className="sidebar">
      <ul>
        <li><button onClick={() => onSelect('addEquipment')}>Add Equipment</button></li>
        <li><button onClick={() => onSelect('viewEquipment')}>View Equipment</button></li>
        {/* Add more sidebar items here */}
      </ul>
    </div>
  );
}

export default AdminSidebar;
