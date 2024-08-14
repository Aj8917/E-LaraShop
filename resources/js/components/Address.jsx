import React, { useState } from 'react'

const Address = () => {
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');

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
      console.log('Address:', address);
      console.log('City:', city);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
            <div className="container mt-5 flex-grow-1">
            <div className="mb-3">
                        <label htmlFor="city" className="form-label">City</label>
                        
                        <select
                            className="form-select"
                            id="city"
                            value={city}
                            onChange={handleCityChange}
                            required
                        >
                            <option value="" disabled>Select your city</option>
                            {cities.map((city, index) => (
                                <option key={index} value={city}>{city}</option>
                            ))}
                        </select>
                    </div>

                <h2>Enter Your Address</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="address" className="form-label">Address</label>
                        <input
                            type="text"
                            className="form-control"
                            id="address"
                            value={address}
                            onChange={handleAddressChange}
                            placeholder="Enter your address"
                            required
                        />
                    </div>

                    
                    <button type="submit" className="btn btn-primary">Submit</button>
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

export default Address