import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import { removeFromCart ,updateCartItem , checkout } from '../slices/CartSlice';
import { Link, useNavigate } from 'react-router-dom';
const Cart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cart = useSelector(state => state.cart.cartItems);

    const handleQuantityChange = (item, event) => {
        const newQuantity = parseInt(event.target.value);
        dispatch(updateCartItem({id:item.id,quantity:newQuantity}))
    };

    const handleRemoveFromCart = (itemId) => {
        dispatch(removeFromCart({ itemId }));
    };

    
    const handleCheckout=(cart)=>{
        dispatch(checkout({ data: cart, navigate }))
    }
    const calculateTotal = () => {
        let totalQuantity = 0;
        let totalPrice = 0;
        cart.forEach(item => {
            totalQuantity += item.quantity;
            totalPrice += item.price * item.quantity;
        });
        return { totalQuantity, totalPrice };
    };

    const { totalQuantity, totalPrice } = calculateTotal();

    return (
        <div className="container mt-5">
        <h1>Cart</h1>
        <div className="row">
            <div className={`col-md-8 ${cart && cart.length > 0 ? 'mb-5' : ''}`}>
                {cart && cart.length > 0 ? (
                    cart.map(item => (
                        <div key={item.id} className="card mb-3" style={{ maxWidth: '600px' }}>
                            <img
                                src={`${import.meta.env.VITE_STORAGE_PATH}${item.image}`}
                                className="card-img-top"
                                alt={item.title}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{item.title}</h5>
                                <p className="card-text">{item.description}</p>
                                <p className="card-text"><strong>Price: ${item.price}</strong></p>
                                <p className="card-text">
                                    <strong>Quantity: </strong>
                                    <select
                                        className="form-select"
                                        aria-label="Default select example"
                                        value={item.quantity}
                                        onChange={(e) => handleQuantityChange(item, e)}
                                    >
                                        {[...Array(5).keys()].map(i => (
                                            <option key={i + 1} value={i + 1}>{i + 1}</option>
                                        ))}
                                    </select>
                                </p>
                                <p className="card-text">
                                    <Button variant='danger' onClick={() => handleRemoveFromCart(item.id)}>
                                        <i className="bi bi-trash"></i>
                                    </Button>
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                     <div className="d-flex justify-content-center align-items-center flex-column min-vh-100">
                        <div className="text-center">
                            <h2 className="mb-3">Your Cart is Empty</h2>
                            <p className="mb-4">Looks like you haven't added anything to your cart yet.</p>
                            <Link to="/">
                                <Button variant="danger">
                                    Go Back
                                </Button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
            {cart && cart.length > 0 && (
                <div className="col-md-4">
                    <h2>Summary</h2>
                    <div className="card" style={{ width: '100%' }}>
                        <div className="card-body">
                            <h5 className="card-title">Cart Summary</h5>
                            <p className="card-text">Total Quantity: {totalQuantity}</p>
                            <p className="card-text">Total Price: $ <b>{totalPrice.toFixed(2)}</b></p>
                        </div>
                        <Button className="w-100" onClick={()=>handleCheckout()}>Checkout</Button>
                    </div>
                </div>
            )}
        </div>
    </div>
    );
};

export default Cart;
