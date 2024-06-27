/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import 'boxicons';
import './styles/viewEquipment.css';

function Listings() {
  const [equipments, setEquipments] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/equipment/')
      .then(response => {
        setEquipments(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the equipment data!', error);
      });
  }, []);

  const handleEdit = (equipmentId) => {
    console.log(`Edit equipment with ID: ${equipmentId}`);
  };

  return (
    <div className="listings-container">
      <h2>Featured Products</h2>
      <div className="listings">
        {equipments.map((equipment) => (
          <div key={equipment.id} className="equipment-card">
            <button className="edit-button" onClick={() => handleEdit(equipment.id)}>
              <box-icon name='edit-alt'></box-icon>
            </button>
            <img src={equipment.image} alt={equipment.name} className="equipment-image" />
            <h3>{equipment.name}</h3>
            <p><strong>Type:</strong> {equipment.type}</p>
            <p><strong>Description:</strong> {equipment.description}</p>
            <p><strong>Price per day:</strong> {equipment.price_per_day}</p>
            <p><strong>Available:</strong> {equipment.availability ? 'Yes' : 'No'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Listings;
