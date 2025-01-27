import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';

const MyOrders = () => {
  
    const [orderDetails, setOrderDetails] = useState();
    const token = localStorage.getItem('token');
    useEffect(()=>{
        axios.post(`/api/orderHistory/`, null, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((response) => {
            // Ensure response.data is an array
            if (Array.isArray(response.data)) {
                const flattenedDetails = response.data.flat(); // Flatten the array if necessary
                setOrderDetails(flattenedDetails);
                console.log(flattenedDetails);
            } else {
                console.error('Expected an array but got:', response.data);
            }
        })
        .catch((error) => {
            JSON.stringify
            console.error('Error fetching order details:', error);
        });
}, [token]); // Depend only on stable dependencies 



    return (

        <div className="d-flex flex-column min-vh-100  py-4a ">
            <div className="container mt-4  p-4 rounded shadow-m address-box">
                <h2 className="mb-4">Order History Details</h2>

                <div className="d-flex justify-content-center align-items-center flex-column min-vh-100  cart">
                    <div className="text-center" style={{ color: 'black' }}>
                        {orderDetails ? (
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Product</th>
                                        <th>Quantity</th>
                                        <th>Total Amount</th>
                                        <th>Address</th>
                                        <th>Status</th>
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
                                            <td>{order.address?.name ? order.address?.name : 'Not City'} ,{order.address?.address || 'Not specified'}</td>
                                            <td><Button variant="success" disabled>{order.status}</Button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p  style={{ color: 'Green' }}>No order details available.</p>
                        )}
                    </div>

                </div>


                        <p  style={{ color: 'Red' }}>*Once place Order Cannot cancel if Dispatched*</p>
            </div>

        </div>
    

  )
}

export default MyOrders