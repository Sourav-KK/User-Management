import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminHeaderComponent from "../../Components/adminComponents/AdminHeaderComponent";
import AdminHome from "../../Components/adminComponents/AdminHome";
import Axios from "../../../Utils/Axios";
import { verifyAdminToken } from "../../../Utils/Constants";

function HomePageAdmin() {
  const Navigate = useNavigate();

  useEffect(() => {
    const adminToken = localStorage.getItem("adminToken");
    if (!adminToken) Navigate("/adminlogin");

    const body = JSON.stringify({ adminToken });

    Axios.post(verifyAdminToken, body, {
      headers: { "Content-Type": "application/json" },
    }).then((response) => {
      console.log(response.data, "response.data in admin home");
      if (response.data.adminToken) {
        console.log("adminToken valid in admin home");
        Navigate("/adminhome");
      } else {
        console.log("adminToken invalid in admin home");
        Navigate("/adminlogin");
      }
    });
  }, []);

  return (
    <div className="bg-gradient-to-r from-green-500 to-indigo-500 min-h-screen bg-cover bg-center">
      <AdminHeaderComponent />
      <AdminHome />
    </div>
  );
}

export default HomePageAdmin;
