import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { store } from './store';
import { Provider, useSelector } from 'react-redux';
import Home from './components/Home';
import ProductDetail from './components/ProductDetail';
import Navbar from './components/Navbar';
import Cart from './components/Cart';
import Login from './components/Login';
import Address from './components/Address';
import FileHandling from './components/Errors/FileHandling';
import NotFound from './components/Errors/NotFound';
import Register from './components/Register';
import AdminDashboard from './components/Admin/AdminDashboard';
import PaymentPage from './components/PaymentPage';
import DeliveryDetails from './components/DeliveryDetails';
import MyOrders from './components/MyOrders';
import VendorDashboard from './components/Vendors/VendorDashboard';
// Function to check user role


const Flash = () => {
    return <div id="banner">Sales For Today!</div>;
}

// Component to conditionally render Flash
const ConditionalFlash = () => {
    const location = useLocation();

    // Show Flash component only for the home route
    return location.pathname === '/' ? <Flash /> : null;
};

const AppRoutes = () => (
    <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/address" element={<Address />} />
        <Route path="/register" element={<Register />} />
        <Route path="/MyOrders" element={<MyOrders />} />
        <Route path="/FileHandling" element={<FileHandling />} />
        <Route path="/paymentPage" element={<PaymentPage />}/>
        <Route path="/delivery" element={<DeliveryDetails />}/>
        <Route path="*" element={<NotFound />} />
    </Routes>
);

const AdminRoutes = () => (
    <Routes>
        {/* Admin-Only Routes */}
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/admin/logout" element={<Login />} />
    </Routes>
);
const VendorRoutes = () => (
    <Routes>
        {/* Vendor-Only Routes */}
        <Route path="/" element={<VendorDashboard />} />
        <Route path="/vendor/logout" element={<Login />} />
    </Routes>
);
const App = () => {
    const userData = useSelector((state) => state.auth.userData.user);
    const userRole = userData ? userData.role : null;
    const navigate = useNavigate();

    useEffect(() => {
       
        if (userRole === 'Admin' && window.location.pathname !== '/admin') {
            navigate('/admin');
        } else if (userRole === 'Vendor' && window.location.pathname !== '/vendor') {
            navigate('/vendor');
        } else if (userRole === null && window.location.pathname !== '/login') {
            navigate('/');
        }
    }, [userRole, navigate]);
    
    return (
        <>
            <ToastContainer />
            <Navbar />
            <Routes>
            {userRole === 'Admin' ? (
                    // Admin routes
                    <Route path="/admin/*" element={<AdminRoutes />} />
                ) : userRole === 'Vendor' ? (
                    // Vendor routes
                    <Route path="/vendor/*" element={<VendorRoutes />} />
                ) : (
                    // General user routes
                    <Route path="/*" element={<AppRoutes />} />
                )}
            </Routes>
        </>
    );
};

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>
);
