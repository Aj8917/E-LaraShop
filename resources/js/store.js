        import { configureStore } from '@reduxjs/toolkit'
        import cartReducer from './slices/CartSlice.jsx';

        export const store = configureStore({
        reducer: {
            cart:cartReducer,
        },
        })