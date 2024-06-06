/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './styles/listings.css';

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

  return (
    <div className="listings-container">
      <h2>Featured Products</h2>
      <div className="listings">
        {equipments.map((equipment) => (
          <div key={equipment.id} className="equipment-card">
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
