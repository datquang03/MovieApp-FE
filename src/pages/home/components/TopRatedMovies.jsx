/* eslint-disable react/prop-types */
import { useState } from "react";
import Titles from "../../../components/Titles";
import { Autoplay, Navigation } from "swiper/modules"; // ✅ Import Autoplay
import { BsBookmarkStarFill } from "react-icons/bs";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import Ratings from "../../../components/Stars";
import Loader from "../../../components/notifications/Loader";
import mainBg from "/assets/mainbg.png";
const SwiperTop = ({ next, prev, movies }) => {
  return (
    <Swiper
      navigation={{ nextEl: next, prevEl: prev, hide: true }}
      slidesPerView={4}
      spaceBetween={40}
      breakpoints={{
        0: { slidesPerView: 1 },
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 4 },
      }}
      autoplay={true}
      speed={1000}
      modules={[Navigation, Autoplay]}
    >
      {movies.map((movie, index) => (
        <SwiperSlide key={index}>
          <div className="p-4 h-rate border border-border bg-dry rounded-lg overflow-hidden group ">
            <img
              src={movie?.image || mainBg}
              alt={movie?.name}
              className="w-full h-full object-cover rounded-lg"
            />

            <div className="hidden group-hover:flex px-4 gap-6 text-center absolute bg-black bg-opacity-70 top-0 left-0 right-0 bottom-0 justify-center items-center flex-col transition duration-500 ease-in-out cursor-pointer">
              <button className="size-12 flex justify-center items-center transition duration-500 ease-in-out hover:bg-subMain rounded-full bg-white bg-opacity-30 text-white">
                <FaHeart />
              </button>

              <Link
                className="font-semibold text-xl truncated line-clamp-2"
                to={`/movie/${movie?._id}`}
              >
                {movie?.name}
              </Link>
              <div className="flex gap-2 text-star">
                <Ratings value={movie?.rate} />
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
const TopRatedMovies = ({ movies, isLoading }) => {
  const [next] = useState(null);
  const [prev] = useState(null);
  return (
    <div className="my-16">
      <Titles title="Top Rated Movies" Icon={BsBookmarkStarFill} />
      <div className="mt-10">
        {isLoading ? (
          <Loader />
        ) : movies.length > 0 ? (
          <SwiperTop nextEl={next} prevEl={prev} movies={movies} />
        ) : (
          <h1 className="text-center text-2xl font-semibold">
            No Movies Found
          </h1>
        )}
      </div>
    </div>
  );
};

export default TopRatedMovies;
