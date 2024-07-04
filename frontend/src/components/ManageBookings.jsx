/* eslint-disable no-unused-vars */
// src/components/ManageBookings.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/managebookings.css';

const ManageBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8000/api/bookings/')
            .then(response => {
                setBookings(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('There was an error fetching the bookings data!', error);
                setError(error);
                setLoading(false);
            });
    }, []);

    const handleConfirm = (bookingId) => {
        axios.put(`http://localhost:8000/api/bookings/${bookingId}/`, { is_confirmed: true })
            .then(response => {
                setBookings(bookings.map(booking =>
                    booking.id === bookingId ? { ...booking, is_confirmed: true } : booking
                ));
            })
            .catch(error => {
                console.error('Error confirming booking:', error);
            });
    };

    if (loading) {
        return <p>Loading bookings...</p>;
    }

    if (error) {
        return <p>Error loading bookings: {error.message}</p>;
    }

    return (
        <div className="manage-bookings">
            <h2>Manage Bookings</h2>
            <div className="booking-list">
                {bookings.length === 0 ? (
                    <p>No bookings available.</p>
                ) : (
                    bookings.map(booking => (
                        <div key={booking.id} className="booking-item">
                            <p><strong>Equipment:</strong> {booking.equipment.name}</p>
                            <p><strong>User:</strong> {booking.user.email}</p>
                            <p><strong>Start Time:</strong> {booking.start_time}</p>
                            <p><strong>End Time:</strong> {booking.end_time}</p>
                            <p><strong>Confirmed:</strong> {booking.is_confirmed ? 'Yes' : 'No'}</p>
                            {!booking.is_confirmed && (
                                <button onClick={() => handleConfirm(booking.id)}>Confirm</button>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ManageBookings;
