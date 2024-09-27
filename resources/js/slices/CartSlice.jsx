import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { handleResponse, handleError } from '../util/StatusError';
import asyncHandler from "../util/asyncHandler";

const initialState = {
    value: 0,
    cartItems: [], // To store the items in the cart
};

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
                console.error('Item not found');
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
        checkout: asyncHandler(async (state, action) => {
            const { data, navigate } = action.payload;
            state.loading = true;
        
            try {
                const response = await axios.post('/api/orders', { cartItems: data.cartItems }, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}` // Add the token if needed
                    }
                });
        
                // Handle order IDs
                let orderIds = [];
                if (response.data.order_id) {
                    orderIds = [response.data.order_id];
                } else if (response.data.orders && Array.isArray(response.data.orders)) {
                    orderIds = response.data.orders.map(order => order.order_id);
                }
                localStorage.setItem('order_id', JSON.stringify(orderIds));
        
            } catch (error) {
               handleError(error);
            } 
        }
        ),
        
        saveAddress: async (state, action) => {
            const { city, address } = action.payload;
            const orderId = JSON.parse(localStorage.getItem('order_id')); 
         
            try {
                const response = await axios.post('/api/saveAddress', { city_id:city , address:address , order_id:orderId }, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}` // Add the token if needed
                    }
                });

                 handleResponse(response, 'Address Saved !');
          } catch (error) {
            handleError(error);
          }
          
        },
    }
});

export const {
    addToCart,
    removeFromCart,
    updateCartItem,
    checkout,
    saveAddress,
} = CartSlice.actions;

export default CartSlice.reducer;
