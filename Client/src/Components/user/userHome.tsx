import React from "react";
// import Axios from "../../../Utils/Axios";
// import { OneUser } from "../../../Utils/Constants";
import jwt_decode from "jwt-decode";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/Store";

const UserHome: React.FC = () => {
  // const [name, setName] = useState("");
  const userToken: any = localStorage.getItem("userToken");
  const decodedToken: any = jwt_decode(userToken);
  // const userKaName = useSelector((state: RootState) => state.username.user?.userName);
  // console.log(userKaName, "userKaName +-+-+ ");

  // Access the user ID from the decoded token
  const userId = decodedToken.id;
  // console.log(userId, "userId **** ");

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     let userDetails = await Axios.get(`${OneUser}${userId}`);
  //     if (userDetails.data.status === "ok")
  //       setName(userDetails.data.user.userName);
  //   };
  //   fetchUser();
  // }, []);

  const userDetails = useSelector((state: RootState) => state.userDetails);
  console.log(userDetails, "userDetails in userhome");

  return (
    <main className="bg-cover bg-center py-20 px-6 md:px-10 lg:px-16">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl text-white font-semibold mb-4">
          Welcome : {String(userDetails?.userName)}
          {/* {String(userKaName)}  */}
          {/* {String(name)} */}
        </h1>
      </div>
    </main>
  );
};

export default UserHome;
