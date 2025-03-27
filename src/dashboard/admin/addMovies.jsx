import { MdDelete } from "react-icons/md";
import userImg from "/assets/userImg.jpg";
import { Input, Message, Select } from "../../components/userInput/userInput";
import Sidebar from "../Sidebar";
import { FaEdit } from "react-icons/fa";
import { ImUpload } from "react-icons/im";
import CastsModal from "../../components/modals/CastsModal";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { movieValidation } from "../../components/validation/movie.validation";
import {
  createMovieAction,
  deleteCastAction,
} from "../../../redux/action/movie.action";
import toast from "react-hot-toast";
import {
  MOVIE_CREATE_RESET,
  RESET_CAST,
} from "../../../redux/constant/movie.constant";
import { InlineError } from "../../components/notifications/Error";
import ProfileUploader from "../../components/profileUploader";
import ImagePreview from "../../components/ImagePreview";
import uploadImageService from "../../../redux/APIs/imageUploaderService";

const AddMovie = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [cast, setCast] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { categories } = useSelector((state) => state.getAllCategories);
  const { isLoading, isError, isSuccess } = useSelector(
    (state) => state.adminCreateMovie
  );
  const { casts } = useSelector((state) => state.casts);
  const [selectedImage, setSelectedImage] = useState(null);

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(movieValidation),
  });

  const uploadImage = async (fileOrBlobUrl) => {
    let file = fileOrBlobUrl;
    if (
      typeof fileOrBlobUrl === "string" &&
      fileOrBlobUrl.startsWith("blob:")
    ) {
      const response = await fetch(fileOrBlobUrl);
      file = await response.blob();
    }
    let uploadedImageUrl = "";
    await uploadImageService(
      file,
      setIsUploading,
      (url) => (uploadedImageUrl = url)
    );
    return uploadedImageUrl;
  };

  const onSubmit = async (data) => {
    setIsUploading(true);
    let finalImageUrl = imageUrl;

    if (selectedImage) {
      finalImageUrl = await uploadImage(selectedImage);
    }

    const updatedCasts = await Promise.all(
      casts.map(async (cast) => {
        if (cast.image.startsWith("blob:")) {
          const uploadedImageUrl = await uploadImage(cast.image);
          return { ...cast, image: uploadedImageUrl };
        }
        return cast;
      })
    );

    const movieData = {
      ...data,
      image: finalImageUrl,
      video: videoUrl,
      casts: updatedCasts,
    };

    console.log(movieData);
    dispatch(createMovieAction(movieData));
    setIsUploading(false);
  };

  const deleteCastHandler = (id) => {
    dispatch(deleteCastAction(id));
    toast.success("Cast deleted successfully");
  };

  useEffect(() => {
    if (modalOpen === false) setCast(null);
    if (isSuccess) {
      reset({
        name: "",
        time: 0,
        language: "",
        year: 0,
        category: "",
        desc: "",
        imageTitle: "",
      });
      setImageUrl("");
      setVideoUrl("");
      setSelectedImage(null);
      dispatch({ type: MOVIE_CREATE_RESET });
      dispatch({ type: RESET_CAST });
      navigate("/addmovie");
    }
    if (isError) {
      toast.error("Something went wrong");
      dispatch({ type: MOVIE_CREATE_RESET });
    }
  }, [modalOpen, isSuccess, isError, dispatch, navigate, reset]);

  return (
    <Sidebar>
      <CastsModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        cast={cast}
      />
      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-bold text-white">Add Movie</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="w-full grid md:grid-cols-2 gap-6">
            <div className="w-full">
              <Input
                label="Name"
                placeholder="Enter movie name"
                type="text"
                bg={true}
                name="name"
                register={register("name")}
              />
              {errors.name && (
                <InlineError type="error" text={errors.name.message} />
              )}
            </div>
            <div className="w-full">
              <Input
                label="Hours"
                placeholder="Enter movie duration"
                type="number"
                bg={true}
                name="time"
                register={register("time")}
              />
              {errors.time && (
                <InlineError type="error" text={errors.time.message} />
              )}
            </div>
          </div>
          <div className="w-full grid md:grid-cols-2 gap-6">
            <div className="w-full">
              <Input
                label="Language"
                placeholder="Enter movie language"
                type="text"
                bg={true}
                name="language"
                register={register("language")}
              />
              {errors.language && (
                <InlineError type="error" text={errors.language.message} />
              )}
            </div>
            <div className="w-full">
              <Input
                label="Years"
                placeholder="Enter movie year of released"
                type="number"
                bg={true}
                name="year"
                register={register("year")}
              />
              {errors.year && (
                <InlineError type="error" text={errors.year.message} />
              )}
            </div>
          </div>
          {/* IMAGE */}
          <div className="w-full grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <div className="w-full">
                <Input
                  label="Image Title"
                  placeholder="Enter movie image title"
                  type="text"
                  bg={true}
                  name="imageTitle"
                  register={register("imageTitle")}
                />
                {errors.imageTitle && (
                  <InlineError type="error" text={errors.imageTitle.message} />
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-border font-semibold text-sm">
                Image with title
              </p>
              <ProfileUploader setImageUrl={setSelectedImage} />
              <ImagePreview
                image={
                  selectedImage ? URL.createObjectURL(selectedImage) : imageUrl
                }
              />
            </div>
          </div>
          {/* DESCRIPTION */}
          <div className="w-full">
            <Message
              label="Description"
              placeholder="Enter movie description"
              type="text"
              name="desc"
              register={register("desc")}
            />
            {errors.desc && (
              <InlineError type="error" text={errors.desc.message} />
            )}
          </div>
          {/* CATEGORY */}
          <div className="text-sm w-full">
            <Select
              label="Category"
              options={categories?.length > 0 ? categories : []}
              name="category"
              register={register("category")}
            />
            {errors.category && (
              <InlineError type="error" text={errors.category.message} />
            )}
          </div>
          {/* VIDEO */}
          <div className="flex flex-col gap-2 w-full">
            <label className="text-border font-semibold text-sm">
              Movie Video
            </label>
            <div className={`w-full grid${videoUrl && "md:grid-cols-2"} gap-6`}>
              {videoUrl && (
                <div className="w-full bg-main text-sm text-subMain py-4 border border-border rounded flex items-center justify-center flex-col">
                  Video Uploaded
                </div>
              )}
              <div className="w-full">
                <Input
                  placeholder="Enter movie link"
                  type="text"
                  bg={true}
                  name="video"
                  onChange={(e) => setVideoUrl(e.target.value)}
                />
              </div>
            </div>
          </div>
          {/* CASTS */}
          <div className="w-full grid lg:grid-cols-2 gap-6 items-start">
            <button
              type="button" // Ngăn submit form
              onClick={() => setModalOpen(true)}
              className="w-full py-4 bg-main border border-subMain border-dashed text-white rounded"
            >
              Add Casts
            </button>
            <div className="grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-4 grid-cols-2 gap-4">
              {casts?.length > 0 &&
                casts.map((user) => (
                  <div
                    key={user.id}
                    className="p-2 italic text-xs text-text rounded flex flex-col items-center justify-center bg-main border border-border"
                  >
                    <img
                      src={user?.image || userImg}
                      alt={user?.name}
                      className="w-full h-24 object-cover rounded mb-2"
                    />
                    <p>{user?.name}</p>
                    <div className="flex flex-row justify-center items-center mt-2 w-full gap-2">
                      <button
                        onClick={() => deleteCastHandler(user?.id)}
                        className="w-6 h-6 flex flex-col justify-center items-center bg-dry border border-border text-subMain rounded"
                      >
                        <MdDelete />
                      </button>
                      <button
                        onClick={() => {
                          setCast(user);
                          setModalOpen(true);
                        }}
                        className="w-6 h-6 flex flex-col justify-center items-center bg-dry border border-border text-green-600 rounded"
                      >
                        <FaEdit />
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          {/* SUBMIT BUTTON */}
          <button
            disabled={isLoading || isUploading}
            type="submit"
            className="bg-subMain font-medium hover:bg-dry border border-subMain text-white rounded py-4 w-full transition duration-500 ease-in-out flex flex-row justify-center items-center gap-6"
          >
            {isLoading || isUploading ? (
              "Uploading..."
            ) : (
              <>
                <ImUpload /> Publish Movie
              </>
            )}
          </button>
        </form>
      </div>
    </Sidebar>
  );
};

export default AddMovie;
