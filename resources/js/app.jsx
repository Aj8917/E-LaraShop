import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
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
import Register from './components/Register';
import AdminDashboard from './components/Admin/AdminDashboard';

// Function to check user role
const getUserRole = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user ? user.role : null; // Return role if user exists
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
const user = JSON.parse(localStorage.getItem('user'));
const userRole = user?.role;

const AppRoutes = () => (
  <Routes>
    {/* Public Routes */}
    <Route path="/" element={<Home />} />
    <Route path="/product/:id" element={<ProductDetail />} />
    <Route path="/cart" element={<Cart />} />
    <Route path="/login" element={<Login />} />
    <Route path="/address" element={<Address />} />
    <Route path="/register" element={<Register />} />
    <Route path="/FileHandling" element={<FileHandling />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const AdminRoutes = () => (
 
  <Routes>
    {/* Admin-Only Routes */}
    <Route path="/admin/dashboard" element={<AdminDashboard />} />
    
    <Route path="*" element={<Navigate to="/admin/dashboard" />} />
    
    
  </Routes>
);

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <ToastContainer />
        <Routes>
          {userRole === 'Admin' ? (
            // Admin routes with Navbar included once
            <Route path="/*" element={
              <>
                <Navbar />
                <AdminRoutes />
              </>
            } />
          ) : (
            // General user routes with Navbar included once
            <Route path="/*" element={
              <>
                <Navbar />
                <AppRoutes />
              </>
            } />
          )}
        </Routes>
      </Router>
    </Provider>
  );
};

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);