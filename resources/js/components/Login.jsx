import React, { useState } from 'react'
import { useDispatch } from 'react-redux';



const Login = () => {

const [email,setEmail]= useState('');
const [password, setPassword] = useState('');

const handleLogin=()=>{
    dispatch()
}
 return (
<div className="d-flex justify-content-center align-items-center min-vh-100">
    <div className="card p-4 shadow-lg" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center mb-4">Login</h2>
        
        <form>
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
        </form>
    </div>
</div>

  )
}

export default Login