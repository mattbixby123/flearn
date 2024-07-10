// src/store/authSlice.js
import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: typeof window !== 'undefined' ? localStorage.getItem('authToken') || '': '',
    user: null,
  },
  reducers: {
    setToken: (state, action) => {
      const token = action.payload;
      localStorage.setItem('authToken', token);
      state.token = token;
    },
    clearToken: (state) => {
      localStorage.removeItem('authToken');
      state.token = '';
    },
    setUser: (state, action) => {
      const user = action.payload;
      state.user = user;
    },
    clearUser: (state) => {
      state.user = null
    },
  },
})

export const { setToken, clearToken, setUser, clearUser } = authSlice.actions;

export const selectToken = state => state.auth.token;
export const selectUser = state => state.auth.user;

export default authSlice.reducer