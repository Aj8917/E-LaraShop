import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap';
import axios from 'axios';

const DeliveryDetails = () => {
    const [orderDetails, setOrderDetails] = useState([]);
    const orderIds = JSON.parse(localStorage.getItem('order_id')) || [];
    const token = localStorage.getItem('token');

    const hasFetched = useRef(false);

    useEffect(() => {
        if (hasFetched.current || orderIds.length === 0 || !token) {
            // Prevent redundant calls
            return;
        }

        hasFetched.current = true; // Mark as fetched

        // Remove duplicates
        const uniqueOrderIds = [...new Set(orderIds)];

        Promise.all(
            uniqueOrderIds.map((id) =>
                axios.post(`/api/fetchOrderDetails/${id}`, null, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            )
        )
            .then((responses) => {
                const details = responses.map((response) => response.data);
                const flattenedDetails = details.flat();
                setOrderDetails(flattenedDetails);
                // setOrderDetails(details);
            })
            .catch((error) => {
                JSON.stringify
                console.error('Error fetching order details:', error);
            });
    }, [orderIds, token]); // Depend only on stable dependencies 

    return (

        <div className="d-flex flex-column min-vh-100  py-4a ">
            <div className="container mt-4  p-4 rounded shadow-m address-box">
                <h2 className="mb-4">Delivery Details</h2>

                <div className="d-flex justify-content-center align-items-center flex-column min-vh-100  cart">
                    <div className="text-center" style={{ color: 'black' }}>
                        {orderDetails.length > 0 ? (
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Order ID</th>
                                        <th>Product</th>
                                        <th>Quantity</th>
                                        <th>Total Amount</th>
                                        <th>Status</th>
                                        <th>City</th>
                                        <th>Address</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orderDetails.map((order, index) => (
                                        <tr key={index}>
                                            <td><img 
                                                    src={`${import.meta.env.VITE_STORAGE_PATH}${order.image}`}
                                                    alt="Order" style={{ width: '50px', height: '50px' }} 
                                                /></td>
                                            <td>{order.product}</td>
                                            <td>{order.quantity}</td>
                                            <td>${order.total_amount}</td>
                                            <td>{order.status}</td>
                                            <td>{order.address?.name ? order.address?.name : 'Not specified'}</td>
                                            <td>{order.address?.address || 'Not specified'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p>No order details available.</p>
                        )}
                    </div>

                </div>


                        <p  style={{ color: 'Red' }}>*Once place Order Cannot cancel if Dispatched*</p>
            </div>

        </div>
    )
}

export default DeliveryDetails