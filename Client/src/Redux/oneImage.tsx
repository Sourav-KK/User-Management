import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  imageURL: string | null;
  fileName: string | null;
}

const initialState: UserState = {
  imageURL: null,
  fileName: null,
};

const oneImage = createSlice({
  name: "userPics",
  initialState,
  reducers: {
    addImage: (
      state,
      action: PayloadAction<{
        imageURL: string | null;
        fileName: string | null;
      }>
    ) => {
      state.imageURL = action.payload.imageURL;
      state.fileName = action.payload.fileName;
    },
  },
});

export const { addImage } = oneImage.actions;
export default oneImage.reducer;
