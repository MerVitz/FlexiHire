/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// src/components/AdminSidebar.jsx
// src/components/AdminSidebar.jsx
import React from 'react';
import PropTypes from 'prop-types';
import './styles/adminsidebar.css';

const AdminSidebar = ({ onSelect }) => {
    return (
        <div className="admin-sidebar">
            <ul>
                <li onClick={() => onSelect('addEquipment')}>Add Equipment</li>
                <li onClick={() => onSelect('viewEquipment')}>View Equipment</li>
                <li onClick={() => onSelect('manageBookings')}>Bookings</li>
                <li onClick={() => onSelect('manageNotifications')}>Notifications</li>
            </ul>
        </div>
    );
};

AdminSidebar.propTypes = {
    onSelect: PropTypes.func.isRequired
};

export default AdminSidebar;
