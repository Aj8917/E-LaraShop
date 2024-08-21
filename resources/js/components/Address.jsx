import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { saveAddress } from '../slices/CartSlice'

const Address = () => {
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');

    const dispatch = useDispatch();

    const cities = [
        'New York',
        'Los Angeles',
        'Chicago',
        'Houston',
        'Phoenix'
    ];

    const handleAddressChange = (e) => {
        setAddress(e.target.value);
    };

    const handleCityChange = (e) => {
        setCity(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here

        dispatch(saveAddress({ city, address }));
    };

    return (
        <div className="d-flex flex-column min-vh-100 bg-light py-4">
            <div className="container mt-4 bg-white p-4 rounded shadow-sm">
                <h2 className="mb-4">Enter Your Address</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="city" className="form-label">City </label>
                        <select
                            className="form-select"
                            id="city"
                            value={city}
                            onChange={handleCityChange}
                            required
                        >
                            <option value="" disabled>Select city</option>
                            {cities.map((city, index) => (
                                <option key={index} value={city}>{city}</option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="address" className="form-label">Address</label>
                        <textarea
                            className="form-control"
                            id="address"
                            value={address}
                            onChange={handleAddressChange}
                            placeholder="Enter your address"
                            rows="4"
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary w-100">Submit</button>
                </form>
            </div>
            <footer className="mt-auto py-3 bg-light text-center">
                <div className="container">
                    <span className="text-muted">Your footer content here</span>
                </div>
            </footer>
        </div>
    );
}

export default Address;
