import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Axios from "../../Utils/Axios";
import {
  AllUsers,
  BlockUser,
  DeleteUser,
  UnBlockUser,
} from "../../Utils/Constants";

interface User {
  _id: string;
  userName: string;
  email: string;
  password: string;
  isBlocked: boolean;
  deleted: boolean;
  __v: number;
}

const UserTableComponent = () => {
  const [selectedRow, setSelectedRow] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [tabData, setTabData] = useState<User[]>([]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = tabData.filter(
    (item) =>
      item.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item._id.includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (userId: string) => {
    Axios.delete(`${DeleteUser}/${userId}`).then((response) => {
      if (response.data.status === "ok") {
        toast.success(response.data.message);
        const updatedUsers = tabData.filter((user) => user._id !== userId);
        setTabData(updatedUsers);
      } else if (response.data.status === "notOK")
        toast.error(response.data.message);
      else toast.error(response.data.message);
    });
  };

  const handleUnBlock = (userId: string) => {
    Axios.put(`${UnBlockUser}/${userId}`).then((response) => {
      if (response.data.status === "ok") {
        const unBlockedUser = tabData.map((user) =>
          user._id === userId ? { ...user, isBlocked: false } : user
        );
        setTabData(unBlockedUser);
        toast.success(response.data.message);
      } else if (response.data.status === "notOK")
        toast.error(response.data.message);
      else toast.error(response.data.message);
    });
  };

  const handleBlock = (userId: string) => {
    Axios.put(`${BlockUser}/${userId}`).then((response) => {
      if (response.data.status === "ok") {
        const BlockedUser = tabData.map((user) =>
          user._id === userId ? { ...user, isBlocked: true } : user
        );
        setTabData(BlockedUser);
        toast.success(response.data.message);
      } else if (response.data.status === "notOK")
        toast.error(response.data.message);
      else toast.error(response.data.message);
    });
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await Axios.get(AllUsers);
        setTabData(response.data.allActiveUsers);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
    fetchUserDetails();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <input
          type="text"
          placeholder="Search..."
          className="w-1/4 px-4 py-2 border border-gray-300 rounded-lg"
          value={searchTerm}
          onChange={handleSearch}
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
          <Link to="/createnewuser">Create User</Link>
        </button>
      </div>
      <table className="w-3/4 mx-auto border-solid border-black border-2 rounded-md">
        <thead className="border-black border-2">
          <tr className="border-black border-2">
            <th className="py-2">ID</th>
            <th className="py-2">Name</th>
            <th className="py-2">Email</th>
            <th className="py-2">Access</th>
            <th className="py-2">Delete</th>
            <th className="py-2">Edit</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr
              key={item._id}
              className={`${
                selectedRow === item._id ? "bg-blue-100" : ""
              } hover:bg-blue-50 cursor-pointer text-center border-black border-2`}
            >
              <td className="py-2">{item._id}</td>
              <td className="py-2">{item.userName}</td>
              <td className="py-2">{item.email}</td>

              {item.isBlocked ? (
                <td
                  className="py-2 rounded-full bg-red-500 text-white"
                  onClick={() => handleUnBlock(item._id)}
                >
                  <button>Unblock</button>
                </td>
              ) : (
                <td
                  className="py-2 rounded-full bg-green-500 text-white"
                  onClick={() => handleBlock(item._id)}
                >
                  <button>Block</button>
                </td>
              )}

              <td className="py-2 rounded-full bg-red-500 text-white max-h-0.5">
                <button onClick={() => handleDelete(item._id)}>Delete</button>
              </td>
              <td className="py-2 rounded-full bg-blue-500 text-white max-h-0.5">
                <Link to={`/updateUser/${item._id}`}>
                  <button>Edit</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTableComponent;
