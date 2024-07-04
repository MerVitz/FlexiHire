/* eslint-disable no-unused-vars */
// src/components/AdminDashboard.jsx
import React, { useState } from 'react';
import AddEquipment from './AddEquipment';
import ViewEquipment from './ViewEquipment';
import ManageBookings from './ManageBookings';
import Notifications from './Notifications';
import AdminSidebar from './AdminSidebar';
import Footer from './footer';
import Navbar from './navbar';
import './styles/admindashboard.css';

function AdminDashboard() {
  const [selectedSection, setSelectedSection] = useState('addEquipment');

  const renderSection = () => {
    switch (selectedSection) {
      case 'addEquipment':
        return <AddEquipment />;
      case 'viewEquipment':
        return <ViewEquipment />;
      case 'manageBookings':
        return <ManageBookings />;
      case 'manageNotifications':
        return <Notifications />;
      default:
        return <div>Select a section from the sidebar.</div>;
    }
  };

  return (
    <>
      <Navbar />
      <div className="admin-dashboard">
        <AdminSidebar onSelect={setSelectedSection} />
        <div className="admin-content">
          {renderSection()}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AdminDashboard;