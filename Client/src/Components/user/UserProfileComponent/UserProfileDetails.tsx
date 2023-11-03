import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Axios from "../../../../Utils/Axios";
import { OneUser, UpdateUserDetails } from "../../../../Utils/Constants";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

function UserProfileDetails() {
  const Navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  const userToken: string | null = localStorage.getItem("userToken");
  if (userToken) var decodedToken: any = jwt_decode(userToken);
  else Navigate("/userlogin");
  const userId = decodedToken.id;

  useEffect(() => {
    const fetchUser = async () => {
      let userDetails = await Axios.get(`${OneUser}${userId}`);
      if (userDetails.data.status === "ok") {
        setUserName(userDetails.data.user.userName),
          setEmail(userDetails.data.user.email);
      }
    };
    fetchUser();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    const body = JSON.stringify({
      userName,
      email,
    });
    event?.preventDefault();
    console.log(" 1 ");
    if (!userName || !email) {
      toast.error("Please fill the fields", {
        duration: 3000,
        position: "top-center",
      });
      return;
    }
    console.log(" 2 ");
    try {
      let response = await Axios.patch(`${UpdateUserDetails}${userId}`, body, {
        headers: { "Content-Type": "application/json" },
      });
      console.log(" 3 ");

      if (response.data.status == "ok") {
        toast.success("Successfully updated!");
        Navigate("/profile");
        console.log(" 4 ");
      } else if (response.data.status == "notOK")
        toast.error("User with similar details Already exists!");
      else toast.error(`Oops an error occured: ${response.data.message}`);
      console.log(" 5 ");
    } catch (error: any) {
      toast.error(
        `${error.message}Internal error. Sorry for the inconvinience`
      );
    }
  };
  return (
    <>
      <div className="w-96 p-4">
        <h2 className="text-2xl text-center font-bold mb-4">Update</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="userName"
              className="px-2 block text-sm font-medium leading-6 text-gray-900"
            >
              User Name
            </label>
            <div className="mt-2">
              <input
                id="userName"
                name="userName"
                type="text"
                autoComplete="userName"
                required
                value={userName}
                onChange={(event) => setUserName(event.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                placeholder="Name"
              />
            </div>
          </div>
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

          {/* <div>
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
                placeholder="Enter new assword"
              />
            </div>
          </div> */}

          <div>
            <button
              type="submit"
              className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default UserProfileDetails;
