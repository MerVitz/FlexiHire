/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './styles/editequipmentform.css';

const EditEquipmentForm = ({ equipment, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    id: equipment.id,
    name: equipment.name,
    type: equipment.type,
    description: equipment.description,
    price_per_day: parseFloat(equipment.price_per_day).toFixed(2),
    availability: equipment.availability,
    image: equipment.image
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
        ...formData,
        [name]: files ? files[0] : (name === 'price_per_day' ? parseFloat(value) : value)
    });
};

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('type', formData.type);
    data.append('description', formData.description);
    data.append('price_per_day', formData.price_per_day);
    data.append('availability', formData.availability);
    // Only append the image if it has been changed
    if (formData.image && formData.image !== equipment.image) {
        data.append('image', formData.image);
    }

    try {
        const response = await axios.put(`http://localhost:8000/api/equipment/${equipment.id}/`, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log('Updated equipment data:', response.data);
        onUpdate(response.data);
        onClose();
    } catch (error) {
        console.error('Error updating equipment:', error.response ? error.response.data : error.message);
    }
};

  return (
    <div className="edit-form-modal">
      <div className="edit-form-container">
        <h2>Edit Equipment</h2>
        <div className="current-image-container">
          <img src={equipment.image} alt={equipment.name} className="current-image" />
        </div>
        <form onSubmit={handleSubmit}>
          <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          </label>
          <label>
          Type:
          <input
            type="text"
            name="type"
            value={formData.type}
            onChange={handleChange}
          />
          </label>
          <label>
          Description:
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
          </label>
          <label>
          Price per day:
          <input
            type="number"
            name="price_per_day"
            value={formData.price_per_day}
            onChange={handleChange}
          />
          </label>
          <label>
          Availability:
          <select
            name="availability"
            value={formData.availability}
            onChange={handleChange}
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
          </label>
          <label>
            Current Image:
            <img src={equipment.image} alt="Current Equipment" className="current-image-preview" />
          </label>
          <label>
              Change Image:
              <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
              />
          </label>
          <button type="submit">Save Changes</button>
          <button type="button" onClick={onClose}>Cancel</button>
          </form>
      </div>
    </div>
  );
};

// Props.
EditEquipmentForm.propTypes = {
  equipment: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price_per_day: PropTypes.number.isRequired,
    availability: PropTypes.bool.isRequired,
    image: PropTypes.string.isRequired
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  onUpdate:PropTypes.func.isRequired
};

export default EditEquipmentForm;

