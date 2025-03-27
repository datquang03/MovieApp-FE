/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Input } from "../../components/userInput/userInput";
import MainModal from "./MainModal";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { InlineError } from "../../components/notifications/Error";
import {
  addCastAction,
  updateCastAction,
} from "../../../redux/action/movie.action";
import toast from "react-hot-toast";
import ProfileUploader from "../profileUploader";
import ImagePreview from "../ImagePreview";

const CastsModal = ({ modalOpen, setModalOpen, cast }) => {
  const dispatch = useDispatch();
  const [castImage, setCastImage] = useState(""); // Blob URL hoặc URL hiện tại của cast
  const [selectedImage, setSelectedImage] = useState(null); // File ảnh được chọn
  const generateId = Math.floor(Math.random() * 1000000000);

  // Validate cast
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(
      yup.object().shape({
        name: yup.string().required("Cast name is required"),
      })
    ),
  });

  const onSubmit = (data) => {
    const image = selectedImage
      ? URL.createObjectURL(selectedImage)
      : castImage; // Dùng blob URL tạm thời

    if (cast) {
      dispatch(
        updateCastAction({
          ...data,
          image,
          id: cast.id,
        })
      );
      toast.success("Cast updated successfully");
    } else {
      dispatch(
        addCastAction({
          ...data,
          image,
          id: generateId,
        })
      );
      toast.success("Cast created successfully");
    }
    reset();
    setCastImage("");
    setSelectedImage(null);
    setModalOpen(false);
  };

  useEffect(() => {
    if (cast) {
      setValue("name", cast?.name);
      setCastImage(cast?.image || ""); // Giữ nguyên ảnh hiện tại nếu có
    } else {
      setCastImage("");
      setSelectedImage(null);
    }
  }, [cast, setValue]);

  return (
    <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
      <div className="w-full flex flex-col text-white">
        <h2 className="text-3xl font-bold mb-6 text-center">
          {cast ? "Update" : "Create"}
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6 text-left"
        >
          <div className="w-full">
            <Input
              label="Cast Name"
              placeholder={"Enter cast name"}
              type="text"
              name={"name"}
              register={register("name")}
              bg={false}
            />
            {errors.name && <InlineError text={errors.name.message} />}
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-border font-semibold text-sm">Cast image</p>
            <div className="border border-t border-dashed border-border rounded-md p-4">
              <ProfileUploader setImageUrl={setSelectedImage} />
              <ImagePreview
                image={
                  selectedImage ? URL.createObjectURL(selectedImage) : castImage
                }
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full flex flex-col justify-center items-center py-2 font-bold hover:bg-dry border-2 border-subMain rounded bg-subMain transition duration-500 ease-in-out text-white"
          >
            {cast ? "Update" : "Create"}
          </button>
        </form>
      </div>
    </MainModal>
  );
};

export default CastsModal;
