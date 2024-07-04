// src/components/Inbox.jsx
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/inbox.css';

const Inbox = () => {
    const [messages, setMessages] = useState([]);
    const userId = localStorage.getItem('user_id'); // Fetch the user ID from local storage

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/bookings/', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });

                console.log('Bookings response:', response.data); // Log the response data

                // Filter bookings to only include those made by the logged-in user and are confirmed
                const confirmedBookings = response.data.filter(booking => booking.is_confirmed && booking.user.id === parseInt(userId));

                console.log('Confirmed bookings for user:', confirmedBookings); // Log confirmed bookings for the user

                const successMessages = confirmedBookings.map(booking => ({
                    id: booking.id,
                    message: `Your booking for ${booking.equipment ? booking.equipment.name : 'unknown item'} from ${booking.start_time} to ${booking.end_time} has been successful.`
                }));
                setMessages(successMessages);
            } catch (error) {
                console.error('Error fetching bookings:', error);
            }
        };

        fetchBookings();
    }, [userId]);

    return (
        <div className="inbox-container">
            <h2>Inbox</h2>
            {messages.length === 0 ? (
                <p>No new messages.</p>
            ) : (
                messages.map(message => (
                    <div key={message.id} className="notification-item">
                        <p>{message.message}</p>
                    </div>
                ))
            )}
        </div>
    );
};

export default Inbox;
