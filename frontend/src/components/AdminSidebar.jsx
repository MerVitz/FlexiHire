/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// src/components/AdminSidebar.jsx
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './styles/adminsidebar.css';
import axios from 'axios';

const AdminSidebar = ({ onSelect }) => {
    const [hasAdminPrivileges, setHasAdminPrivileges] = useState(false);

    useEffect(() => {
        
        const checkAdminPrivileges = async () => {
            try {
                // When the endpoint is referenced with, 'http://localhost:8000/' it does not work, 
                const response = await axios.get('http://127.0.0.1:8000/api/check-admin-privileges', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                console.log('Response data:', response.data )
                // Check if the response data indicates admin privileges
                if (response.data.has_admin_privileges) {
                    setHasAdminPrivileges(true);
                } else {
                    setHasAdminPrivileges(false);
                }
            } catch (error) {
                console.error('Error checking admin privileges:', error);
            }
        };

        checkAdminPrivileges(); // Call the function
    }, []); // Add an empty dependency array to run only on mount

    return (
        <div className="admin-sidebar">
            <ul>
                <li onClick={() => onSelect('addEquipment')}>Add Equipment</li>
                <li onClick={() => onSelect('viewEquipment')}>View Equipment</li>
                <li onClick={() => onSelect('manageBookings')}>Bookings</li>
                <li onClick={() => onSelect('manageNotifications')}>Notifications</li>
                {hasAdminPrivileges && (
                    <li onClick={() => onSelect('addAdmin')}>Add Admin</li>
                )}
            </ul>
        </div>
    );
};

AdminSidebar.propTypes = {
    onSelect: PropTypes.func.isRequired
};

export default AdminSidebar;
