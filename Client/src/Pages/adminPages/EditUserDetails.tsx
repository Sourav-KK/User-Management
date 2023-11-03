import { useEffect } from "react";
import AdminHeaderComponent from "../../Components/adminComponents/AdminHeaderComponent";
import EditUser from "../../Components/adminComponents/EditUserComponent";
import { useNavigate } from "react-router-dom";
import { verifyAdminToken } from "../../../Utils/Constants";
import Axios from "../../../Utils/Axios";

function EditUserDetails() {
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
        // Navigate("/adminhome");
      } else {
        console.log("adminToken invalid in admin home");
        Navigate("/adminlogin");
      }
    });
  }, []);

  return (
    <>
      <AdminHeaderComponent />
      <EditUser />
    </>
  );
}

export default EditUserDetails;
