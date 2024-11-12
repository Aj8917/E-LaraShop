import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

// Asynchronous thunk for login
export const login = createAsyncThunk(
  'auth/login',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/login', payload);
      const userData = {
        name: response.data.user,
        role: response.data.role,
      };
      
      // Store token and user in localStorage
      localStorage.setItem('token', response.data.access_token);
      localStorage.setItem('user', JSON.stringify(userData));

      return userData; // Return userData to be used in `fulfilled` case
    } catch (error) {
      toast.error(`${error.response.data.message}`);
      return rejectWithValue(error.response.data);
    }
  }
);

// Auth Slice
const initialState = {
  userData: {
    user: JSON.parse(localStorage.getItem('user')) || null,
  },
  token: localStorage.getItem('token') || null,
  loading: false,
  errors: null,
};

export const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      state.userData.user = null;
      toast.success(`Logout Successful`);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.userData.user = action.payload; // Set the user data
        state.loading = false;
        toast.success(`Login Successful`)
      })
      .addCase(login.rejected, (state, action) => {
        state.errors = action.payload;
        state.loading = false;
      });
  },
});

export const { logout } = AuthSlice.actions;
export default AuthSlice.reducer;
