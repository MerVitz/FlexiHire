// src/components/BookingForm.jsx
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './styles/bookingform.css';

const BookingForm = ({ equipmentId, onClose }) => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const storedUserId = localStorage.getItem('user_id');
        if (storedUserId) {
            const parsedUserId = parseInt(storedUserId);
            setUserId(parsedUserId);
            console.log('Fetched user ID:', parsedUserId);
        } else {
            console.error('No user ID found in localStorage.');
        }
    }, []);

    console.log('Below is the id that is being fetched');
    console.log('this is the passed id', userId);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!userId) {
            console.error('User ID is missing!');
            return;
        }
        try {
            const response = await axios.post('http://localhost:8000/api/bookings/', {
                user: userId, // Include user ID in the request
                equipment: equipmentId,
                start_time: `${startDate}T${startTime}`,
                end_time: `${endDate}T${endTime}`,
                is_confirmed: false
            });
            console.log('Booking response:', response.data);
            onClose();
        } catch (error) {
            console.error('Error creating booking:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className="booking-form-modal">
            <div className="booking-form-container">
                <h2>Book Equipment</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Start Date:
                        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
                    </label>
                    <label>
                        Start Time:
                        <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
                    </label>
                    <label>
                        End Date:
                        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
                    </label>
                    <label>
                        End Time:
                        <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />
                    </label>
                    <button type="submit">Submit Booking</button>
                    <button type="button" onClick={onClose}>Cancel</button>
                </form>
            </div>
        </div>
    );
};

BookingForm.propTypes = {
    equipmentId: PropTypes.number.isRequired,
    onClose: PropTypes.func.isRequired
};

export default BookingForm;
