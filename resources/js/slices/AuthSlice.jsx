import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

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
            
             toast.success(`Login Successfull`);
          }catch(error)
          {
          
            toast.error(`${error.response.data.message}`);
          }
        } ,  
    }
})
export const {login}=AuthSlice.actions;
export default AuthSlice.reducer;