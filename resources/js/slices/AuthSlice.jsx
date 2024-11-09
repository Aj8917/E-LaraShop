import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { handleResponse, handleError } from '../util/StatusError';
import asyncHandler from "../util/asyncHandler";

export const AuthSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: localStorage.getItem('token') || null,
    loading: false,
    errors: null,
  },
  reducers: {
    login: async (state, action) => {

      try {
        const response = await axios.post('/api/login', action.payload)
       
        localStorage.setItem('token', response.data.access_token);
       
        const userData = {
          name: response.data.user,
          role: response.data.role
      };
        //console.log(response.data);
        localStorage.setItem('user', JSON.stringify(userData));
        state.user=userData;
        toast.success(`Login Successfull`);
      } catch (error) {
      //  navigate('/login')
        toast.error(`${error.response.data.message}`);
      }
    },
    logout: async () => {
      try {
      const response = await axios.post('/api/logout');

      // Clear the token from localStorage
      localStorage.removeItem('token');
      toast.success(`Logout Successfull`);
    } catch (error) {
        navigate('/login')
        toast.error(`${error.response.data.message}`);
      }
    },
   
  }
})
export const {
  login,
  logout,
  register
} = AuthSlice.actions;
export default AuthSlice.reducer;