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

            const { user_id, productId, amount, quantity } = action.payload;

            state.cartItems.push({                                      
                user_id,
                productId,
                amount,
                quantity,
            });
            state.value+=quantity;
        }
    }
})

export const  {addToCart}= CartSlice.actions;

export default CartSlice.reducer;