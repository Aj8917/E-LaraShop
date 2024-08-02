import { createSlice } from "@reduxjs/toolkit";

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
        }
    }
})

export const  {addToCart}= CartSlice.actions;

export default CartSlice.reducer;