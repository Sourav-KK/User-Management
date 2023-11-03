const BaseUrl = "http://localhost:6001/";

// user

const UserSignup = "/usersignup";
const Userlogin = "/userlogin";
const UpdateUserDetails = "/updateuserdetails/";
const UpdateUserImage = "/updateuserimage/";

const VerifyUserToken = "/verifyusertoken";
const verifyAdminToken = "/verifyadmintoken";

// admin

const AdminLogin = "/adminlogin";
const BlockUser = "/blockuser";
const UnBlockUser = "/unblockuser";
const NewUser = "/createnewuser";
const EditUserDetails = "/edituserdetails/";
const DeleteUser = "/deleteuser";
const AllUsers = "/allusers"
const OneUser = '/oneuser/'

export {
  BaseUrl,
  UserSignup,
  Userlogin,
  UpdateUserDetails,
  UpdateUserImage,
  AdminLogin,
  BlockUser,
  UnBlockUser,
  NewUser,
  EditUserDetails,
  DeleteUser,
  VerifyUserToken,
  verifyAdminToken,
  AllUsers,
  OneUser
};
