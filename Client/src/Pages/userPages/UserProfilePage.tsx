import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "../../../Utils/Axios";
import { VerifyUserToken } from "../../../Utils/Constants";

import UserHeader from "../../Components/user/userHeader";
import UserProfileImage from "../../Components/user/UserProfileComponent/UserProfileImage";
import UserProfileDetails from "../../Components/user/UserProfileComponent/UserProfileDetails";

const UserProfilePage: React.FC = () => {
  const Navigate = useNavigate();

  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    console.log(userToken, "userToken in UserHomePage");

    if (!userToken) Navigate("/userlogin");

    const body = JSON.stringify({ userToken });

    Axios.post(VerifyUserToken, body, {
      headers: { "Content-Type": "application/json" },
    }).then((response) => {
      if (response.data.userToken) {
        console.log("userToken is valid in UserHomePage");
        Navigate("/profile");
      } else {
        console.log("userToken invalid in UserHomePage");
        Navigate("/userlogin");
      }
    });
  }, []);
  return (
    <>
      <UserHeader />
      <div className="flex justify-center">
        <UserProfileImage />
        <UserProfileDetails />
      </div>
    </>
  );
};

export default UserProfilePage;
