import React from 'react';
import { useNavigate } from 'react-router-dom';


const PaymentPage = () => {
   
   
    const navigate=useNavigate();
    const handleMethodChange = (e) => {
        //alert(e.target.value);
        navigate('/delivery')
    };

  return (
    <div className="container mt-5">
      <h1>Payment Method</h1>
      <div className="row">
        <div className="card col-12 col-md-6 col-lg-4 mb-3" >
          {/* Cash on Delivery Card */}
          <div className="card" style={{ cursor: 'pointer' }}>
            <div className="card-body">
              <div className="form-check">
                <input 
                  className="form-check-input" 
                  type="radio" 
                  id="COD" 
                  name="paymentMethod" 
                  value="COD" 
                  onChange={handleMethodChange} 
                   
                />
                <label className="form-check-label" htmlFor="COD">
                  Cash on Delivery
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6 col-lg-4 mb-3">
          {/* Card Payment Option (Disabled) */}
          <div className="card" style={{ cursor: 'not-allowed', opacity: 0.5 }}>
            <div className="card-body">
              <div className="form-check">
                <input 
                  className="form-check-input" 
                  type="radio" 
                  id="Card" 
                  name="paymentMethod" 
                  value="Card" 
                  onChange={handleMethodChange} 
                  disabled 
                />
                <label className="form-check-label" htmlFor="Card">
                  Card (Disabled)
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6 col-lg-4 mb-3">
          {/* API Payment Option (Disabled) */}
          <div className="card" style={{ cursor: 'not-allowed', opacity: 0.5 }}>
            <div className="card-body">
              <div className="form-check">
                <input 
                  className="form-check-input" 
                  type="radio" 
                  id="API" 
                  name="paymentMethod" 
                  value="API" 
                  onChange={handleMethodChange} 
                  disabled 
                />
                <label className="form-check-label" htmlFor="API">
                  API (Disabled)
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
