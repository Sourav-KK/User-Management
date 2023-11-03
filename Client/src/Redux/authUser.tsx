import { createSlice } from "@reduxjs/toolkit";

interface User {
  id: string;
  username: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    isLogin: (state) => {
      state.isAuthenticated = true;
    },
    isLogout: (state) => {
      state.isAuthenticated = false;
    },
  },
});

export const { isLogin, isLogout } = authSlice.actions;
export default authSlice.reducer;
