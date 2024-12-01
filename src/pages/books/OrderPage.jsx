import React, { useEffect, useState } from 'react';
import { useGetOrderByEmailQuery } from '../../redux/features/orders/ordersApi';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import UseBookDetails from './UseBookDetails';

const OrderPage = () => {
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const [filterStatus, setFilterStatus] = useState([]);
    const [filterTime, setFilterTime] = useState([]);

    useEffect(() => {
        if (!currentUser) {
            navigate('/');
        }
    }, [currentUser, navigate]);

    const { data: orders = [], isLoading, isError } = useGetOrderByEmailQuery(currentUser?.email);

    if (isLoading) return <div className="text-center text-blue-500">Loading your orders...</div>;
    if (isError) return <div className="text-center text-red-500">Error fetching orders data. Please try again later.</div>;
    // Filter orders by status and time
    const filteredOrders = orders.filter((order) => {
        // Status filter
        const statusMatch = filterStatus.length === 0 || filterStatus.includes(order.status);
        
        // Time filter
        const timeMatch = filterTime.length === 0 || filterTime.some((time) => {
            const orderDate = new Date(order.orderTime);  // Convert orderTime to a Date object

            if (time === 'Last 30 days') {
                const thirtyDaysAgo = new Date();
                thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
                return orderDate >= thirtyDaysAgo;
            }else if (time === '2024') {
                return orderDate.getFullYear() === 2024;
            } else if (time === '2023') {
                return orderDate.getFullYear() === 2023;
            } else if (time === '2022') {
                return orderDate.getFullYear() === 2022;
            }
            return false;
        });

        return statusMatch && timeMatch;
    });

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
            {/* Sidebar */}
            <div className="w-full md:w-64 bg-white shadow-lg p-6 rounded-r-lg">
                <h2 className="text-3xl font-bold text-center mb-8 ">Order Filters</h2>
                <ul className="space-y-6">
                    <li className="cursor-pointer py-2 px-4 rounded-md text-lg hover:bg-gray-200">
                        <h4 className="font-medium text-gray-700">Order Status</h4>
                        <div className="space-y-2">
                            {['Payment Failed', 'Received', 'Processing', 'Shipped', 'Delivered', 'Cancelled', 'Returned'].map((status) => (
                                <label key={status} className="block">
                                    <input
                                        type="checkbox"
                                        className="mr-2"
                                        value={status}
                                        onChange={(e) => {
                                            const checked = e.target.checked;
                                            setFilterStatus((prev) =>
                                                checked ? [...prev, status] : prev.filter((item) => item !== status)
                                            );
                                        }}
                                    />
                                    {status}
                                </label>
                            ))}
                        </div>
                    </li>
                    <li className="cursor-pointer py-2 px-4 rounded-md text-lg hover:bg-gray-200">
                        <h4 className="font-medium text-gray-700">Order Time</h4>
                        <div className="space-y-2">
                            {['Last 30 days', '2024','2023', '2022'].map((time) => (
                                <label key={time} className="block">
                                    <input
                                        type="checkbox"
                                        className="mr-2"
                                        value={time}
                                        onChange={(e) => {
                                            const checked = e.target.checked;
                                            setFilterTime((prev) =>
                                                checked ? [...prev, time] : prev.filter((item) => item !== time)
                                            );
                                        }}
                                    />
                                    {time}
                                </label>
                            ))}
                        </div>
                    </li>
                </ul>
            </div>

            {/* Content Area */}
            <div className="flex-1 p-8">
                <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6 space-y-6">
                    <h2 className="text-4xl font-bold  mb-6">Your Orders</h2>

                    {filteredOrders.length === 0 ? (
                        <div className="text-lg text-gray-600">You have not placed any orders yet!</div>
                    ) : (
                        <div>
                            {filteredOrders
                                .sort((a, b) => {
                                    // Sort by _id or createdAt in descending order
                                    return b._id.localeCompare(a._id);
                                })
                                .map((order, index) => (
                                    <div key={order._id} className="bg-white shadow-lg rounded-lg overflow-hidden mb-6">
                                        <div className="bg-gray-100 p-4">
                                            <h3 className="font-bold text-xl text-gray-800">Order ID: {order._id}</h3>
                                        </div>
                                        <div className="p-4">
                                            <div className="text-gray-600">
                                                <p><span className="font-semibold">Name:</span> {order.name}</p>
                                                <p><span className="font-semibold">Email:</span> {order.email}</p>
                                                <p><span className="font-semibold">Phone:</span> {order.phone}</p>
                                                <p><span className="font-semibold">Total Price:</span> ₹{order.totalPrice}</p>
                                            </div>

                                            {/* Order Status */}
                                            <div className="mt-4">
                                                <p className={`p-2 rounded-full 
                                                    ${order.status === 'Refund Completed' ? 'bg-green-500' :
                                                    order.status === 'Order Not Placed' ? 'bg-red-500' :
                                                    order.status === 'Payment Failed' ? 'bg-red-600' :
                                                    order.status === 'Received' ? 'bg-blue-500' :
                                                    order.status === 'Processing' ? 'bg-yellow-500' :
                                                    order.status === 'Shipped' ? 'bg-indigo-500' :
                                                    order.status === 'Delivered' ? 'bg-teal-500' :
                                                    order.status === 'Cancelled' ? 'bg-gray-500' :
                                                    order.status === 'Returned' ? 'bg-orange-500' : 'bg-gray-300'} 
                                                    text-white`}>
                                                    {order.status}
                                                </p>
                                            </div>

                                            {/* Refund Information (if applicable) */}
                                            {order.status === 'Refund Completed' && (
                                                <div className="mt-2 text-sm text-gray-600">
                                                    <p>Refund ID: {order.refundId}</p>
                                                    <p>The money will reflect in your card ending with {order.refundCardLastFour} by {order.refundDate}.</p>
                                                </div>
                                            )}

                                            {/* Shipping Address */}
                                            <div className="mt-4">
                                                <h4 className="font-semibold text-gray-700">Shipping Address</h4>
                                                <p className="text-gray-600">
                                                    {order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode}
                                                </p>
                                            </div>

                                            {/* Product Information */}
                                            <div className="mt-4">
                                                <h4 className="font-semibold text-gray-700">Product</h4>
                                                <div className="flex flex-wrap gap-4">
                                                    {order.productIds.map((productId, index) => (
                                                        <UseBookDetails key={index} productId={productId} />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OrderPage;
