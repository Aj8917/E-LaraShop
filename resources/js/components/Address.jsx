import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { saveAddress } from '../slices/CartSlice'
import axios from 'axios';
import { error } from 'laravel-mix/src/Log';
import { handleError } from '../util/StatusError';

const Address = () => {
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [cities , setCities] = useState([]);

    const dispatch = useDispatch();

    // const cities = [
    //     'New York',
    //     'Los Angeles',
    //     'Chicago',
    //     'Houston',
    //     'Phoenix'
    // ];
    
    useEffect(()=>{
        
            axios.get('/api/fetchCities')
                                 .then(res=>{
                                    setCities(res.data);
                                }).catch(error=>{
                                    handleError(error);
                                })
    },[]);
   
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
        <div className="d-flex flex-column min-vh-100  py-4a ">
            <div className="container mt-4  p-4 rounded shadow-m address-box">
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
                            {cities.map((cityObj) => (
                                <option key={cityObj.id} value={cityObj.id}>
                                    {cityObj.city}
                                </option>
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
           
        </div>
    );
}

export default Address;
