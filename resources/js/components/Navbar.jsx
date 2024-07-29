import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';



const Navbar = () => {
    // Access cart state from Redux store
    const cartItems = useSelector((state) => state.cart.cartItems);
    const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/">Navbar</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/">Home</Link>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Profile
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a className="dropdown-item" href="#">Action</a>
                            <a className="dropdown-item" href="#">Another action</a>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item" href="#">Log out</a>
                        </div>
                    </li>
                </ul>
                <Link className="nav-link" to="/cart">
                <i className="bi bi-cart4"></i> <span className="badge badge-secondary">{totalQuantity}</span>
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
