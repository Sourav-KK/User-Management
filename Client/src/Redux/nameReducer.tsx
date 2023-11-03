import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import type { RootState } from "./Store";

interface User {
  id: string;
  userName: string;
  email: string;
}

interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    nameChange: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
  },
});

export const { nameChange } = userSlice.actions;
export default userSlice.reducer;
