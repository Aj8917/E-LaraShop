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
        },

        removeFromCart:(state,action)=>{
            const {itemId} =action.payload;

            const itemIndex =state.cartItems.findIndex(item=>item.id===itemId);

            if(itemIndex !== -1)
            {
                state.value-=state.cartItems[itemIndex].quantity;
                state.cartItems.splice(itemIndex ,1);
            }else{
                console.error('item not found');
            }
            
        },

        updateCartItem:(state,action)=>{
            const {id,quantity}=action.payload;

            const item=state.cartItems.find(item=>item.id===id);

            if(item){
                state.value=state.value-item.quantity+quantity;
                item.quantity=quantity;
            }

        }
    }
})

export const  {
                addToCart,
                removeFromCart,
                updateCartItem
              }= CartSlice.actions;

export default CartSlice.reducer;