import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import ManageBooks from './manageBooks/ManageBooks';
import AddBook from './addBook/AddBook';

const UserDashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('profile');
    const username = localStorage.getItem('username') || 'Admin';
    const currentUser = {
        name: username,
        email: username
    };
    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        navigate('/admin');
    };
    return (
        <div className="min-h-screen bg-gray-50 py-10 flex flex-col lg:flex-row">
            {/* Sidebar */}
            <div className="w-full lg:w-1/5 bg-white p-4 shadow-lg mb-6 lg:mb-0">
                <h2 className="text-2xl font-semibold mb-4">Admin Dashboard</h2>
                <ul className="space-y-6">
                    <li
                        className={`cursor-pointer py-2 px-4 rounded-md text-lg hover:bg-black hover:text-white ${activeTab === 'profile' ? 'bg-black text-white' : ''}`}
                        onClick={() => handleTabChange('profile')}
                    >
                        Profile
                    </li>
                    <li
                        className={`cursor-pointer py-2 px-4 rounded-md text-lg hover:bg-black hover:text-white ${activeTab === 'dashboard' ? 'bg-black text-white' : ''}`}
                        onClick={() => handleTabChange('dashboard')}
                    >
                        Dashboard
                    </li>
                    <li
                        className={`cursor-pointer py-2 px-4 rounded-md text-lg hover:bg-black hover:text-white ${activeTab === 'add-new-book' ? 'bg-black text-white' : ''}`}
                        onClick={() => handleTabChange('add-new-book')}
                    >
                        Add New Book
                    </li>
                    {/* <li
                        className={`cursor-pointer py-2 px-4 rounded-md text-lg hover:bg-black hover:text-white ${activeTab === 'edit-book' ? 'bg-black text-white' : ''}`}
                        onClick={() => handleTabChange('edit-book')}
                    >
                        Edit Book
                    </li> */}
                    <li
                        className={`cursor-pointer py-2 px-4 rounded-md text-lg hover:bg-black hover:text-white ${activeTab === 'manage-books' ? 'bg-black text-white' : ''}`}
                        onClick={() => handleTabChange('manage-books')}
                    >
                        Manage Books
                    </li>
                    <li
                        className="cursor-pointer py-2 px-4 rounded-md text-lg text-red-600 hover:bg-black hover:text-white"
                        onClick={handleLogout}
                    >
                        Logout
                    </li>
                </ul>
            </div>
            {/* Main Content */}
            <div className="w-full lg:w-4/5 p-8">
                <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6 space-y-6">
                    {/* Profile Tab */}
                    {activeTab === 'profile' && (
                        <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                            <h1 className="text-2xl font-bold mb-4">Profile</h1>
                            <p className="text-gray-700 text-lg mb-4">Welcome, {currentUser?.name || 'User'}!</p>
                            <p className="text-gray-600">Email: {currentUser?.email}</p>
                        </div>
                    )}
                    {/* Dashboard Tab */}
                    {activeTab === 'dashboard' && (
                        <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                            <Dashboard />
                        </div>
                    )}
                    {/* Add New Book Tab */}
                    {activeTab === 'add-new-book' && (
                        <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                            <AddBook />
                        </div>
                    )}
                    {/* Manage Books Tab */}
                    {activeTab === 'manage-books' && (
                        <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                            <ManageBooks />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
