/* eslint-disable no-unused-vars */
// src/components/Notifications.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/notifications.css';

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/notifications/');
                setNotifications(response.data);
            } catch (error) {
                console.error('Error fetching notifications:', error.response ? error.response.data : error.message);
            }
        };

        fetchNotifications();
    }, []);

    return (
        <div className="notifications-container">
            <h2>Notifications</h2>
            {notifications.length === 0 ? (
                <p>There are no notifications.</p>
            ) : (
                <ul>
                    {notifications.map((notification) => (
                        <li key={notification.id} className={notification.requires_confirmation ? 'notification confirm' : 'notification'}>
                            <p>{notification.message}</p>
                            {notification.requires_confirmation && <button>Confirm</button>}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Notifications;
