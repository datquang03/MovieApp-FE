import Sidebar from "./Sidebar";
import { Input } from "../components/userInput/userInput";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ProfileValidation } from "../components/validation/user.validation";
import { useEffect, useState } from "react";
import { InlineError } from "../components/notifications/Error";
import ImagePreview from "../components/ImagePreview";
import { deleteAction, updateAction } from "../../redux/action/user.action";
import { uploadToCloudinary } from "../../utils/cloudinary";
import toast from "react-hot-toast";
import ProfileUploader from "../components/profileUploader";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { userInfo, isLoading, isSuccess, isError } = useSelector(
    (state) => state.userLogin
  );
  const { isLoading: deleteLoading, isError: deleteError } = useSelector(
    (state) => state.userDeleteProfile
  );

  const [imageUrl] = useState(
    userInfo ? userInfo.image : "/assets/userImg.jpg"
  );
  const [selectedImage, setSelectedImage] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(ProfileValidation) });

  const onSubmit = async (data) => {
    let finalImageUrl = imageUrl;

    if (selectedImage) {
      const uploadedImageUrl = await uploadToCloudinary(selectedImage);
      if (uploadedImageUrl) {
        finalImageUrl = uploadedImageUrl;
      }
    }

    dispatch(updateAction({ ...data, image: finalImageUrl }));
    console.log({ ...data, image: finalImageUrl });
  };
  //delete profile
  const deleteProfile = () => {
    window.confirm("Are you sure you want to delete your profile?") &&
      dispatch(deleteAction());
  };

  useEffect(() => {
    if (userInfo) {
      setValue("fullName", userInfo.fullName);
      setValue("email", userInfo.email);
    }
    if (isSuccess) {
      dispatch({ type: "USER_UPDATE_PROFILE_RESET" });
    }
    if (isError || deleteError) {
      toast.error(isError || deleteError);
      dispatch({ type: "USER_UPDATE_PROFILE_RESET" });
      dispatch({ type: "USER_DELETE_PROFILE_RESET" });
    }
  }, [userInfo, setValue, deleteError, isError, isSuccess, dispatch]);

  return (
    <Sidebar>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <h2 className="text-xl font-bold text-white">Update Profile</h2>
        <div className="w-full grid lg:grid-cols-12 gap-6">
          <div className="col-span-10">
            <ProfileUploader setImageUrl={setSelectedImage} />
          </div>
          <div className="col-span-2">
            <ImagePreview
              image={
                selectedImage ? URL.createObjectURL(selectedImage) : imageUrl
              }
              name={userInfo?.fullName}
            />
          </div>
        </div>
        <div className="w-full">
          <Input
            label={"Email"}
            placeholder={"Enter your email"}
            name="email"
            register={register("email")}
            type="email"
            bg={true}
          />
          {errors.email && <InlineError text={errors.email.message} />}
        </div>
        <div className="w-full">
          <Input
            label={"Full Name"}
            placeholder={"Enter your name"}
            name="fullName"
            register={register("fullName")}
            type="text"
            bg={true}
          />
          {errors.fullName && <InlineError text={errors.fullName.message} />}
        </div>
        <div className="flex gap-2 flex-wrap flex-col-reverse sm:flex-row justify-between items-center my-4">
          <button
            onClick={deleteProfile}
            disabled={deleteLoading || isLoading}
            className="bg-subMain font-medium hover:bg-main border border-subMain text-white p-4 rounded py-3 px-6 w-full sm:w-auto transition duration-500 ease-in-out"
          >
            {deleteLoading ? "Deleting..." : "Delete account"}
          </button>
          <button
            disabled={deleteLoading || isLoading}
            type="submit"
            className="bg-main font-medium hover:bg-subMain border border-subMain text-white p-4 rounded py-3 px-6 w-full sm:w-auto transition duration-500 ease-in-out"
          >
            {isLoading ? "Updating..." : "Update profile"}
          </button>
        </div>
      </form>
    </Sidebar>
  );
};

export default ProfilePage;
