import React, { useEffect } from "react";
import Axios from "../../../Utils/Axios";
import { VerifyUserToken } from "../../../Utils/Constants";
import { useNavigate } from "react-router-dom";

import UserHeader from "../../Components/user/userHeader";
import UserHome from "../../Components/user/userHome";

const UserHomePage: React.FC = () => {
  const Navigate = useNavigate();

  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    // console.log(userToken, "userToken in UserHomePage");

    if (!userToken) Navigate("/userlogin");

    const body = JSON.stringify({ userToken });

    Axios.post(VerifyUserToken, body, {
      headers: { "Content-Type": "application/json" },
    }).then((response) => {
      if (response.data.userToken) {
        // console.log("userToken is valid in UserHomePage");
        Navigate("/userHome");
      } else {
        // console.log("userToken invalid in UserHomePage");
        Navigate("/userlogin"); 
      }
    });
  }, []);

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-500 min-h-screen bg-cover bg-center">
      <UserHeader />
      <UserHome />
    </div>
  );
};

export default UserHomePage;
