import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import jwt_decode from "jwt-decode";
import toast from "react-hot-toast";
import Axios from "../../../Utils/Axios";
import { Userlogin } from "../../../Utils/Constants";
import { isLogin } from "../../Redux/authUser";
import { RootState } from "../../Redux/Store";
import { addUser } from "../../Redux/oneUserReducer";
// import  {nameChange}  from "../../Redux/nameReducer";

function UserLoginPage() {
  const Navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    const body = JSON.stringify({
      email,
      password,
    });
    event?.preventDefault();

    if (!email || !password) {
      toast.error("Please fill the fields", {
        duration: 3000,
        position: "top-center",
      });
      return;
    }
    try {
      let response = await Axios.post(Userlogin, body, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.data.status == "ok") {
        localStorage.setItem("userToken", response.data.user);
        console.log(
          response.data.userExists,
          "response.data.userExists userLoginPage"
        );

        const userToken: any = localStorage.getItem("userToken");
        const decodedToken: any = jwt_decode(userToken);
        console.log(decodedToken, " decodedToken after in userlogin");

        dispatch(isLogin());
        dispatch(addUser(response.data.userExists));

        console.log(isLoggedIn, "isLoggedIn in userloginpage");
        toast.success("Welcome back fam. We missed you");
        Navigate("/userHome");
      } else if (response.data.status == "notOK")
        toast.error(`${response.data.message}`);
      else toast.error(`Oops an error occured: ${response.data.message}`);
    } catch (error: any) {
      toast.error("Internal error. Sorry for the inconvinience");
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 ">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Welcome back
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={(event) => handleSubmit(event)}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Email"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                placeholder="Password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Log in
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a part of our family?
          <a
            href="#"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            <Link to={"/usersignup"}>Signup</Link>
          </a>
        </p>
      </div>
    </div>
  );
}

export default UserLoginPage;
