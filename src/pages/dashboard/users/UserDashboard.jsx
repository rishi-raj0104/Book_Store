import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useGetOrderByEmailQuery } from '../../../redux/features/orders/ordersApi';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate(); // Hook for navigation
    const { data: orders = [], isLoading, isError } = useGetOrderByEmailQuery(currentUser?.email);
    const [activeTab, setActiveTab] = useState('profile');
    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    if (isLoading) return <div className="text-center mt-10 text-lg text-gray-600">Loading...</div>;
    if (isError) return <div className="text-center mt-10 text-red-500">Error getting orders data</div>;

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    // Calculate total orders and total price
    const totalOrders = orders.length;
    const totalPrice = orders.reduce((sum, order) => sum + order.totalPrice, 0);

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 py-10">
            {/* Sidebar */}
            <div className="w-full md:w-1/5 bg-white p-4 shadow-lg">
                <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
                <ul className="space-y-6">
                    <li
                        className={`cursor-pointer py-2 px-4 rounded-md text-lg hover:bg-black hover:text-white ${
                            activeTab === 'profile' ? 'bg-black text-white' : ''
                        }`}
                        onClick={() => handleTabChange('profile')}
                    >
                        Profile
                    </li>
                    <li
                        className={`cursor-pointer py-2 px-4 rounded-md text-lg hover:bg-black hover:text-white ${
                            activeTab === 'dashboard' ? 'bg-black text-white' : ''
                        }`}
                        onClick={() => handleTabChange('dashboard')}
                    >
                        Dashboard
                    </li>
                    <li
                        className="cursor-pointer py-2 px-4 rounded-md text-lg hover:bg-black hover:text-white"
                        onClick={() => navigate('/orders')}
                    >
                        Orders
                    </li>
                    <li
                        className="cursor-pointer py-2 px-4 rounded-md text-lg hover:bg-black hover:text-white"
                        onClick={() => navigate('/products')}
                    >
                        Products
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
            <div className="w-full md:w-4/5 p-8">
                <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6 space-y-6">
                    {/* Profile Tab */}
                    {activeTab === 'profile' && (
                        <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                            <h1 className="text-2xl font-bold  mb-4">Profile</h1>
                            <p className="text-gray-700 text-lg mb-4">Welcome, {currentUser?.name || 'User'}!</p>
                            <p className="text-gray-600">Email: {currentUser?.email}</p>
                            {/* Add more profile details here */}
                        </div>
                    )}

                    {/* Dashboard Tab */}
                    {activeTab === 'dashboard' && (
                        <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                            <h1 className="text-2xl font-bold  mb-4">Dashboard</h1>
                            <p className="text-gray-700 text-lg mb-6">Here are your order details:</p>
                            <div className="space-y-2">
                                <p className="text-gray-600 text-lg">Total Orders: <span className="font-semibold">{totalOrders}</span></p>
                                <p className="text-gray-600 text-lg">Total Price: <span className="font-semibold">₹{totalPrice}</span></p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
