import React, { useState, useEffect } from "react";
import Axios from "../../../../Utils/Axios";
import { UpdateUserImage } from "../../../../Utils/Constants";
import { useSelector, useDispatch } from "react-redux";
import userPics, { addImage } from "../../../Redux/userPics";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { RootState } from "../../../Redux/Store";

const UserProfileImage = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageURL, setImageURL] = useState<string | undefined>(undefined);
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const userImage = useSelector((state: RootState) => {
    return state.userPic.imageURL;
  });

  console.log(userImage, "userImage in userproimaag");

  const userToken: string | null = localStorage.getItem("userToken");
  if (userToken) var decodedToken: any = jwt_decode(userToken);
  else Navigate("/userlogin");
  const userId = decodedToken.id;

  useEffect(() => {
    const fetchImage = async () => {
      try {
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
    fetchImage();
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("helo");
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log(file, "file");
      setSelectedFile(file);
      const imageURL = URL.createObjectURL(file);
      console.log(imageURL, "imageURL");
      setImageURL(imageURL);
    }
  };

  const handleImgUpload = () => {
    if (selectedFile) {
      const formdata = new FormData();
      console.log(formdata, "formdata");
      formdata.append("image", selectedFile);
      console.log(typeof formdata, "83478");

      Axios.post(`${UpdateUserImage}${userId}`, formdata).then((response) => {
        console.log(response, "response in profileimage");
        dispatch(
          addImage({
            imageURL: response.data.image, // Replace with the relevant property from the server response
            // fileName: response.data.fileName, // Replace with the relevant property from the server response
          })
        );
        if (response.data.status === "ok") {
          setSelectedFile ( null);
          setImageURL(undefined);

          toast.success("Successfully updated!");
          // Navigate("/userhome");
        } else toast.error("Successfully updated!");

        //  dispatch(addImage({ image: selectedFile }));
      });
    }
  };

  return (
    <>
      <div className="w-64 p-4 ml-8">
        <h2 className="text-2xl text-center font-bold mb-4">Upload Image</h2>
        <form>
          <div className="mb-4">
            <div className="flex items-center justify-center">
              <img
                src={
                  userImage
                    ? userImage
                    : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                }
                alt="default"
                className="max-w-full max-h-48"
              />
            </div>
            <label
              htmlFor="image-upload"
              className="block text-sm font-medium text-gray-700"
            >
              Choose an image
            </label>
            <input
              id="image-upload"
              name="image-upload"
              type="file"
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              onChange={handleFileChange}
            />
          </div>
          {selectedFile && (
            <div>
              <p>Selected image:</p>
              <img src={imageURL} alt="Selected" className="mt-2 max-h-48" />
            </div>
          )}
          <div>
            <button
              type="button"
              className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={handleImgUpload}
            >
              Upload
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UserProfileImage;
