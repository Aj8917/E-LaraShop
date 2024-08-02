import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';

const Cart = () => {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart.cartItems);

    const handleQuantityChange = (item, event) => {
        const newQuantity = parseInt(event.target.value);
        dispatch({ type: 'UPDATE_CART_ITEM', payload: { ...item, quantity: newQuantity } });
    };

    const handleRemoveFromCart = (itemId) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: itemId });
    };

    const handleAddToCart = (item) => {
        dispatch({ type: 'ADD_TO_CART', payload: item });
    };

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
        <div className="d-flex">
            <div className="flex-grow-1">
                <h1>Cart</h1>
                
                    {cart && cart.length > 0 ? cart.map(item => (
                        
                           
                            <div className="card mx-auto mb-3" style={{ maxWidth: '600px' }}>
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
                        
                    )) : (
                        <div>No items in the cart</div>
                    )}
            </div>
            <div className="ms-3 m-5">
                <h2>Summary</h2>
                <div className="card" style={{ width: '18rem' }}>
                    <div className="card-body">
                        <h5 className="card-title">Cart Summary</h5>
                        <p className="card-text">Total Quantity: {totalQuantity}</p>
                        <p className="card-text">Total Price: $ <b>{totalPrice.toFixed(2)}</b></p>
                    </div>
                <Button >Checkout</Button>

                </div>
            </div>
        </div>
    );
};

export default Cart;
