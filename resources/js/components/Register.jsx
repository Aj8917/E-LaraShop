import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import asyncHandler from "../util/asyncHandler";
import axios from 'axios';
import { handleError, handleResponse } from '../util/StatusError';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigate = useNavigate();
    const errors = useSelector((state) => state.auth.errors) // Access errors from the Redux store
    
    const handleRegistration = asyncHandler(async () => {
        if (password !== confirmPassword) {
            toast.error("Passwords do not match!");
        } else {
            try {
                const response = await axios.post('/api/register', { name, email, password });
                handleResponse(response, response.data.message);
                navigate('/login'); // Navigate after success
            } catch (error) {
                handleError(error);
            }
        }

    });


    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100">
            <div className="card p-4 shadow-lg" style={{ maxWidth: "400px", width: "100%" }}>
                <h2 className="text-center mb-4">Register</h2>

                <form>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input
                            type="text"
                            className={`form-control ${errors?.name ? 'is-invalid' : ''}`}
                            id="name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            placeholder="Enter your Name"
                            required
                        />

                    </div>

                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input
                            type="email"
                            className={`form-control ${errors?.email ? 'is-invalid' : ''}`}
                            id="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                        />

                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            className={`form-control ${errors?.password ? 'is-invalid' : ''}`}
                            id="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                        />

                    </div>

                    <div className="mb-3">
                        <label htmlFor="confirm_password" className="form-label">Confirm Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="confirm_password"
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                            placeholder="Re-enter password"
                            required
                        />
                    </div>
                    <button
                        type="button"
                        onClick={handleRegistration}
                        className="btn btn-warning rounded w-100"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Register;
