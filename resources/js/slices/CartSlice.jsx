import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";


const initialState = {
    value: 0,
    cartItems: [], // To store the items in the cart

}

export const CartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {

            const { data } = action.payload;

            if (data && data.quantity !== undefined) {
                state.cartItems.push(data);
                state.value += data.quantity;
            } else {
                console.error('Invalid data payload:', data);
            }
        },

        removeFromCart: (state, action) => {
            const { itemId } = action.payload;

            const itemIndex = state.cartItems.findIndex(item => item.id === itemId);

            if (itemIndex !== -1) {
                state.value -= state.cartItems[itemIndex].quantity;
                state.cartItems.splice(itemIndex, 1);
            } else {
                console.error('item not found');
            }

        },

        updateCartItem: (state, action) => {
            const { id, quantity } = action.payload;

            const item = state.cartItems.find(item => item.id === id);

            if (item) {
                state.value = state.value - item.quantity + quantity;
                item.quantity = quantity;
            }

        },
        checkout: async (state, action) => {
            const { data, navigate } = action.payload;
            state.loading = true;
            try {
                const response = await axios.post('/api/orders', { cartItems: data.cartItems }, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}` // Add the token if needed
                    }
                });

                if (response.status === 200 || response.status === 201 ) {
                    //console.log(response.data)
                    navigate('/address')
                    toast.success('Checkout successful!');
                } else {
                    navigate('/FileHandling');
                    toast.error('Unexpected response from server.');
                }
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    // Unauthorized, prompt for login
                    navigate('/login')
                    toast.error('Unauthorized: Please log in again.');

                } else {
                    navigate('/cart')
                    if (error.response && error.response.data && error.response.data.errors) {
                        const errors = error.response.data.errors;
                        const errorMessages = Object.values(errors)
                            .flat()
                            .map(err => `• ${err}`) // Prefix each error with a bullet point
                            .join('\n'); // Join errors with a newline character for list formatting
                            toast.error(`Checkout error:\n${errorMessages}`);
                    }
                }
            }
        },
    }
})

export const {
    addToCart,
    removeFromCart,
    updateCartItem,
    checkout
} = CartSlice.actions;

export default CartSlice.reducer;