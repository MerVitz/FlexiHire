/* eslint-disable no-unused-vars */
// src/components/AddEquipment.jsx
import axios from 'axios';
import React, { useState } from 'react';
import './styles/addequipment.css';

function AddEquipment() {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [pricePerDay, setPricePerDay] = useState('');
  const [availability, setAvailability] = useState(true);
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('type', type);
    formData.append('description', description);
    formData.append('price_per_day', pricePerDay);
    formData.append('availability', availability);
    formData.append('image', image);

    try {
      await axios.post('http://localhost:8000/api/equipment/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Equipment added successfully');
    } catch (error) {
      console.error('There was an error adding the equipment!', error);
    }
  };

  return (
    <div className="add-equipment-container">
      <h2>Add New Equipment</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Type</label>
          <input type="text" value={type} onChange={(e) => setType(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Price per day</label>
          <input type="number" value={pricePerDay} onChange={(e) => setPricePerDay(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Availability</label>
          <select value={availability} onChange={(e) => setAvailability(e.target.value === 'true')} required>
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
        </div>
        <div className="form-group">
          <label>Image</label>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} required />
        </div>
        <button type="submit" className="submit-button">Add Equipment</button>
      </form>
    </div>
  );
}

export default AddEquipment;
