import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { store } from './store';
import { Provider } from 'react-redux'
import Home from './components/Home';
import ProductDetail from './components/ProductDetail';
import Navbar from './components/Navbar';
import Cart from './components/Cart';
import Login from './components/Login';
import Address from './components/Address'
import FileHandling from './components/Errors/FileHandling'
import NotFound from './components/Errors/NotFound'

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
    <Provider store={store}>
        <Router>
            <Navbar />
            <App />
            <ToastContainer />
            <ConditionalFlash />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/login" element={<Login />} />
                <Route path="/address" element={<Address />} />
                <Route path="*" element={<NotFound />} />
                <Route path="FileHandling" element={<FileHandling />} />
            </Routes>
        </Router>
    </Provider>
);