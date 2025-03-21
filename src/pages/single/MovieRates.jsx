/* eslint-disable react/prop-types */
import Titles from "../../components/Titles";
import { BsBookmarkStarFill } from "react-icons/bs";
import { Message, Select } from "../../components/userInput/userInput";
import Ratings from "../../components/Stars";
import userImage from "/assets/userImg.jpg";
import { RiMovie2Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { InlineError } from "../../components/notifications/Error";
import { useEffect } from "react";
import { reviewValidation } from "../../components/validation/movie.validation";
import { Link } from "react-router-dom";
import Loader from "../../components/notifications/Loader";
import { reviewMovieAction } from "../../../redux/action/movie.action";
const MovieRates = ({ movie }) => {
  const ratings = [
    {
      title: "0 - Poor",
      value: 0,
    },
    {
      title: "1 - Bad",
      value: 1,
    },
    {
      title: "2 - Average",
      value: 2,
    },
    {
      title: "3 - Good",
      value: 3,
    },
    {
      title: "4 - Excellent",
      value: 4,
    },
    { title: "5 - Masterpiece", value: 5 },
  ];
  const dispatch = useDispatch();
  const { isLoading, isError } = useSelector(
    (state) => state.createMovieReview
  );
  const { userInfo } = useSelector((state) => state.userLogin);

  // validate review
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(reviewValidation) });
  // on submit
  const onSubmit = (data) => {
    dispatch(reviewMovieAction({ id: movie?._id, review: data }));
  };

  useEffect(() => {
    if (isError) {
      toast.error(isError);
      dispatch({ type: "MOVIE_REVIEW_RESET" });
    }
  }, [isError, dispatch]);
  return (
    <div className="my-12">
      <Titles title="Reviews" Icon={BsBookmarkStarFill} />
      <div className="mt-10 xl:grid flex flex-col items-center justify-center grid-cols-5 gap-12 bg-dry xs:p-10 py-10 px-2 sm:p-20 rounded">
        {/* write reviews */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="xl:col-span-2 w-full flex items-center justify-center flex-col gap-8"
        >
          <h3 className="text-xl text-text font-semibold">
            Reviews {movie?.name}
          </h3>
          <p className="text-sm leading-7 font-medium text-border">
            Here is where you can post your own opinions about the movie.
          </p>
          <div className="text-sm w-full">
            <Select
              label="Select Rating"
              options={ratings}
              name="rating"
              register={{ ...register("rating") }}
            />
            <div className="flex mt-4 text-lg gap-2 text-star">
              <Ratings value={watch("rating", false)} />
            </div>
            {errors.rating && <InlineError text={errors.rating.message} />}
          </div>
          {/* message */}
          <div className="w-full">
            <Message
              name="comment"
              register={{ ...register("comment") }}
              label="Message"
              placeholder="Write your review here..."
            />
            {errors.comment && <InlineError text={errors.comment.message} />}
          </div>
          {userInfo ? (
            <button
              type="submit"
              className="bg-subMain text-white py-3 w-full flex flex-col items-center justify-center rounded h-10 bg-opacity-50 border-2 border-main hover:bg-opacity-90 transition duration-500 line-clamp-1"
            >
              {isLoading ? <Loader /> : "Submit"}
            </button>
          ) : (
            <Link
              to="/login"
              className="bg-main text-white py-3 w-full flex flex-col items-center justify-center rounded h-10 bg-opacity-50 border-2 border-subMain hover:bg-subMain hover:border-main transition duration-500 line-clamp-1"
            >
              You have to login to post a review
            </Link>
          )}
        </form>
        {/* reviews from user */}
        <div className="col-span-3 flex flex-col w-full gap-6">
          <h3 className="text-xl text-text font-semibold">
            Reviews ({movie?.numberOfReviews})
          </h3>
          <div className="w-full flex flex-col bg-main gap-6 rounded-lg md:p-12 p-6 h-header overflow-auto hidden-scrollbar">
            {movie?.reviews?.length > 0 ? (
              movie?.reviews?.map((review, index) => (
                <div
                  key={review?._id || index}
                  className="md:grid flex flex-col w-full grid-cols-12 gap-6 bg-dry p-4 border border-gray-800 rounded-lg"
                >
                  <div className="col-span-2 hidden md:block bg-main">
                    <img
                      src={review?.userImage || userImage}
                      alt={review?.userName}
                      className="w-full h-full rounded-lg object-cover"
                    />
                  </div>
                  <div className="col-span-7 flex flex-col gap-2">
                    <h2 className="border-b border-border pb-2">
                      {review?.userName}
                    </h2>
                    <p className="text-xs leading-6 font-medium text-text">
                      {review?.comment}
                    </p>
                  </div>
                  {/* rates */}
                  <div className="col-span-3 flex flex-row items-center justify-center border-l border-border text-xs gap-1 text-star">
                    <Ratings value={review?.rating} />
                  </div>
                </div>
              ))
            ) : (
              <div className="w-full gap-6 flex flex-col justify-center items-center border border-gray-700 p-5 rounded-md">
                <div className="w-24 h-24 p-5 rounded-full mb-4 bg-dry text-subMain text-4xl flex flex-col justify-center items-center">
                  <RiMovie2Line />
                </div>
                <p className="text-border text-sm">
                  Be the first to review the {movie?.name}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieRates;
