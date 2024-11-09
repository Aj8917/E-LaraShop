import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { login } from '../slices/AuthSlice';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';



const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogin = async () => {
        // Dispatch the login action with the data
        try {
            dispatch(login({ email, password }));
            navigate('/');
        }
        catch (error) {
            toast.error(error);
            navigate('/login');
        }
    }
        return (
            <div className="d-flex justify-content-center align-items-center min-vh-100">
                <div className="card p-4 shadow-lg" id='login' >
                    <h2 className="text-center mb-4">Login</h2>

                    <form >
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input
                                type="email"
                                className="form-control"
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
                                className="form-control"
                                id="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                required
                            />
                        </div>

                        <button
                            type="button"
                            onClick={handleLogin}
                            className="btn btn-primary rounded w-100"
                        >
                            Login
                        </button>
                        
                        <div className='mt-3'>
                            Not Memeber Yet ? <Link to='/register' id='register-link'> Register Now ! </Link>
                        </div>
                    </form>
                </div>
            </div>

        )
    }

    export default Login