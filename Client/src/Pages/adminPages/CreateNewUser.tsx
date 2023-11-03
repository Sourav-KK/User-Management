import CreateUser from "../../Components/adminComponents/CreateUser";
import AdminHeaderComponent from "../../Components/adminComponents/AdminHeaderComponent";

const CreateNewUser: React.FC = () => {
  return (
    <>
      <AdminHeaderComponent />
      <CreateUser />
    </>
  );
};

export default CreateNewUser;
