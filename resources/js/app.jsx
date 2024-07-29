import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route,useLocation} from 'react-router-dom';

import Home from './components/Home';
import Navbar from './components/Navbar';
import ProductDetail from './components/ProductDetail';
const App = () => {
    // return <h1>Welcome!</h1>;
    

};

const Flash = () => {
    return <div id="banner">Sales For Today !</div>;
}

// Component to conditionally render Flash
const ConditionalFlash = () => {
    const location = useLocation();

    // Show Flash component only for the home route
    return location.pathname === '/' ? <Flash /> : null;
};

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(
    <Router>
        <App />
        <Navbar  />
        <ConditionalFlash />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            
        </Routes>
    </Router>
);