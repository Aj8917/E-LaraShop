import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const AuthSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        token: null,
        loading: false,
        error: null,
    },
    reducers:{
        login: async (state , action)=>{
          try 
          { 
             const response = await axios.post('/api/login',action.payload)

             localStorage.setItem('token',response.data.access_token);
             return response.data;
          }catch(error)
          {
                return null;
          }
        } ,  
    }
})
export const {login}=AuthSlice.actions;
export default AuthSlice.reducer;