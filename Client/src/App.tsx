import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardPageAdmin from "./Pages/adminPages/DashboardPageAdmin";
import UserProfilePage from "./Pages/userPages/UserProfilePage";
import LoginPageAdmin from "./Pages/adminPages/LoginPageAdmin";
import UserSignupPage from "./Pages/userPages/UserSignupPage";
import CreateNewUser from "./Pages/adminPages/CreateNewUser";
import HomePageAdmin from "./Pages/adminPages/HomePageAdmin";
import UserLoginPage from "./Pages/userPages/UserLoginPage";
import UpdateUser from "./Pages/adminPages/EditUserDetails";
import UserHomePage from "./Pages/userPages/UserHomePage";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import Store from "./Redux/Store.tsx";
import "tailwindcss/tailwind.css";
import "./App.css";

function App() {
  useEffect(() => {
    const userJWT: any = localStorage.getItem("userToken");
    const adminJWT: any = localStorage.getItem("adminToken");

    if (userJWT) {
      if (
        window.location.pathname === "/userlogin" ||
        window.location.pathname === "/usersignup"
      ) {
        window.location.replace("/userhome");
      }
    }
    if (adminJWT) {
      if (window.location.pathname === "/adminlogin") {
        window.location.replace("/adminhome");
      }
    }
  }, []);

  return (
    <>
      <Provider store={Store}>
        <Router>
          <Routes>
            {/* user paths */}
            <Route path="/usersignup" element={<UserSignupPage />} />
            <Route path="/userlogin" element={<UserLoginPage />} />
            <Route path="/userHome" element={<UserHomePage />} />
            <Route path="/profile" element={<UserProfilePage />} />

            {/* admin paths */}

            <Route path="/adminlogin" element={<LoginPageAdmin />} />
            <Route path="/adminhome" element={<HomePageAdmin />} />
            <Route path="/admindashboard" element={<DashboardPageAdmin />} />
            <Route path="/createnewuser" element={<CreateNewUser />} />
            <Route path="/updateUser/:id" element={<UpdateUser />} />
          </Routes>
        </Router>

        <Toaster />
      </Provider>
    </>
  );
}

export default App;
