/* eslint-disable react/prop-types */
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import mainBg from "../../../../assets/mainbg.png";
import FlexMovieItems from "../../../components/FlexMovieItems";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import Loader from "../../../components/notifications/Loader";
import { RiMovie2Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { IfLikedMovies, LikeMovie } from "../../../context/MovieExistedFunc";

const MovieSwiper = ({ sameClass, movies }) => {
  const { isLoading } = useSelector((state) => state.userLikeMovie);
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);

  // if like function
  const isLiked = (movie) => {
    return IfLikedMovies(movie);
  };
  return (
    <Swiper
      direction="vertical"
      slidesPerView={1}
      loop={true}
      speed={1000}
      modules={[Autoplay]}
      autoplay={{ delay: 4000, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      className={`${sameClass} h-[500px] md:h-[400px] sm:h-[300px]`}
    >
      {movies.slice(0, 6).map((movie, index) => (
        <SwiperSlide key={index} className="relative rounded overflow-hidden">
          <img
            src={movie?.image || mainBg}
            alt={movie?.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute bg-gradient-to-r from-transparent via-[#080a1ad6] to-[#080a1ad6] xl:pl-52 sm:pl-32 pl-8 top-0 bottom-0 right-0 left-0 flex flex-col justify-center lg:gap-8 md:gap-5 gap-4">
            <h1 className="xl:text-4xl truncate capitalize font-sans sm:text-2xl text-xl font-bold">
              {movie?.name}
            </h1>
            <div className="flex gap-5 items-center text-dryGray">
              <FlexMovieItems movie={movie} />
            </div>
            <div className="flex gap-5 items-center">
              <Link
                to={`/movie/${movie?._id}`}
                className="bg-subMain hover:text-main transition duration-500 ease-in-out text-white px-8 py-3 rounded font-medium sm:text-sm text-xs"
              >
                View Detail
              </Link>
              <button
                onClick={() => LikeMovie(movie, dispatch, userInfo)}
                disabled={isLiked(movie) || isLoading}
                className={`bg-white ${
                  isLiked ? "bg-subMain" : "bg-white"
                } hover:text-subMain transition duration-500 ease-in-out px-5 py-3 rounded text-sm bg-opacity-30`}
              >
                <FaHeart className="size-3" />
              </button>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

const Banners = ({ movies, isLoading }) => {
  const sameClass =
    "w-full flex justify-center items-center flex-col xl:h-96 bg-dry lg:h-64 h-48";
  return (
    <div className="relative w-full">
      {isLoading ? (
        <div className={sameClass}>
          <Loader />
        </div>
      ) : movies?.length > 0 ? (
        <MovieSwiper className={sameClass} movies={movies} />
      ) : (
        <div className={sameClass}>
          <div className="flex justify-center items-center flex-col w-24 h-24 p-5 mb-4 rounded-full bg-dry text-subMain text-4xl">
            <RiMovie2Line />
          </div>
          <h1 className="text-2xl font-semibold">No Movies Found</h1>
        </div>
      )}
    </div>
  );
};

export default Banners;
