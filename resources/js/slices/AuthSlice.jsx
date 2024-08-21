import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const AuthSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        token: localStorage.getItem('token') || null,
        loading: false,
        error: null,
    },
    reducers:{
        login: async (state , action)=>{
            
          try 
          { 
             const response = await axios.post('/api/login',action.payload)

             localStorage.setItem('token',response.data.access_token);
             localStorage.setItem('user',JSON.stringify(response.data.user));
            
             toast.success(`Login Successfull`);
          }catch(error)
          {
            navigate('/login')
            toast.error(`${error.response.data.message}`);
          }
        } ,  
        logout: async()=>{
          const response = await axios.post('/api/logout');

          // Clear the token from localStorage
          localStorage.removeItem('token');
          toast.success(`Logout Successfull`);
         
          // Optionally, you can return the response or any other data

          
        }
    }
})
export const {login,logout}=AuthSlice.actions;
export default AuthSlice.reducer;