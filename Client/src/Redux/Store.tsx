import { configureStore } from "@reduxjs/toolkit";
import usernameReducer from "./nameReducer";
import authUser from "./authUser";
import oneUser from "./oneUserReducer";
import userPics from "./userPics";
// import oneImage from "./oneImage";

const Store = configureStore({
  reducer: {
    username: usernameReducer,
    auth: authUser,
    userDetails: oneUser,
    userPic: userPics,
  },
});
export type RootState = ReturnType<typeof Store.getState>;
export default Store;
