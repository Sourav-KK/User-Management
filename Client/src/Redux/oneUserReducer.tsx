import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface UserState {
    userName: string;
    email: string;
    userId: string;
  }
  
  const initialState: UserState = {
    userName: "",
    email: "",
    userId: "",
  };

const oneUserSlice = createSlice({
    name:"userDetails",
    initialState,
    reducers:{
        addUser:(state, action: PayloadAction<UserState>)=>{
            return action.payload 
        }
    }
})

export const { addUser } = oneUserSlice.actions;
export default oneUserSlice.reducer;