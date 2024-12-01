import React from 'react';
import Footer from '../../components/Footer';
import Header from './AdminNav'; 
import AdminFooter from './AdminFooter'; 
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div>
      <Header /> {/* Common header for admin pages */}
      <main>
        <Outlet /> {/* Renders the matched child route */}
      </main>
      <AdminFooter /> {/* Common footer for admin pages */}
    </div>
  );
};

export default AdminLayout;
