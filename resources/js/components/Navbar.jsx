import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../slices/AuthSlice'


const Navbar = () => {
    // Access cart state from Redux store
    const cartItems = useSelector((state) => state.cart.cartItems || []);

    const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

    //const user = JSON.parse(localStorage.getItem('user'));
    const user = useSelector((state) => state.auth?.userData?.user || JSON.parse(localStorage.getItem('user')));

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            dispatch(logout()); // Call the logout action
            
                navigate('/login'); 
           
            localStorage.removeItem('user'); // Clear user data from localStorage
            localStorage.removeItem('order_id'); // Clear user data from localStorage

        } catch (error) {
            navigate('/');
            console.error('Logout failed', error);
        }
    };
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            {user?.role!=="Admin" ? (
            <Link className="navbar-brand text-white dark:text-white/70" to="/">Home</Link>
        ) : ('')}
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto">
                    {/* <li className="nav-item active">
                        <Link className="nav-link" to="/">Home</Link>
                    </li>
                    */}
   {/* <Link className="navbar-brand text-white dark:text-white/70" to="/paymentPage">paymentPage</Link> */}
                    {!user ? (
                        <Link className="navbar-brand text-white dark:text-white/70" to="/login">Login</Link>
                    ) : ('')}

                    {user ? (
                        <li className="nav-item dropdown ">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <b className="text-white dark:text-white/70">{user?.name}</b>
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            {user?.role!=="Admin" && user?.role!=="Vendor" ? (
                                <Link className="dropdown-item" to="/MyOrders"><i class="bi bi-list-stars"></i> My Orders</Link>
                            ) : ('')}
                            
                                <a className="dropdown-item" href="#">Another action</a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="#" onClick={handleLogout}>Log out</a>
                            </div>
                        </li>
                    ) : ''}

                </ul>
                <Link
                    className={`nav-link ${totalQuantity === 0 ? 'disabled' : ''}`}
                    to="/cart" >
                    <i className="bi bi-cart4"></i> <span className="badge badge-secondary">{totalQuantity}</span>
                </Link>
            </div>
        </nav >
    );
};

export default Navbar;
