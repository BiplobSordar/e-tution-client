
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  accessToken: null,       
  isAuthenticated: false,
  loading: true,          
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload ?? true;
    },
    setUser(state, action) {
      state.user = action.payload.user || null;
      state.accessToken = action.payload.accessToken || null; 
      state.isAuthenticated = !!action.payload.user;
      state.loading = false;
    },
    setAccessToken(state, action) {
      state.accessToken = action.payload; 
    },
    clearUser(state) {
      state.user = null;
      state.accessToken = null;    
      state.isAuthenticated = false;
      state.loading = true;
    },
  },
});

export const { setUser, clearUser, setLoading, setAccessToken } = authSlice.actions;
export default authSlice.reducer;
