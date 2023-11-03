import express from "express";
import uploadSingleFile from "../Helpers/multer";
import {
  userSignup,
  userLogin,
  updateUserDetails,
  verifyUserToken,
  userImage,
} from "../Helpers/userHelpers";
import {
  adminLogin,
  createNewUser,
  deleteUser,
  editUserDetails,
  Blockuser,
  unBlockUser,
  verifyAdminToken,
  allUsers,
  oneUser,
} from "../Helpers/adminHelpers";

const Router = express.Router();

// user

Router.post("/usersignup", userSignup); // use signup form
Router.post("/userlogin", userLogin); // user login form
Router.patch("/updateuserdetails/:id", updateUserDetails); // user update userDetails
Router.post("/updateuserimage/:id", uploadSingleFile, userImage); // image upload
Router.get("/userImage/:id");
Router.post("/verifyusertoken", verifyUserToken); // verifyig user token
Router.post("/verifyadmintoken", verifyAdminToken); // verifyig user token

// Admin

Router.post("/adminlogin", adminLogin); // admin login form
Router.put("/blockuser/:id", Blockuser); // admin block/unblock user
Router.put("/unblockuser/:id", unBlockUser); // admin block/unblock user
Router.post("/createnewuser", createNewUser); // admin create user
Router.patch("/edituserdetails/:id", editUserDetails); // update user details
Router.delete("/deleteuser/:id", deleteUser); // admin delete user
Router.get("/allusers", allUsers); // get all user details
Router.get("/oneuser/:id", oneUser); // get all user details

export default Router;
