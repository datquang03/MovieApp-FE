import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules"; // ✅ Import Autoplay
import { Movies } from "/data/movies.db.js";
import FlexMovieItems from "../../../components/FlexMovieItems";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

const Banners = () => {
  return (
    <div className="relative w-full">
      <Swiper
        direction="vertical"
        slidesPerView={1}
        loop={true}
        speed={1000}
        modules={[Autoplay]} // ✅ Bây giờ Autoplay đã được định nghĩa
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        className="w-full xl:h-96 bg-dry lg:h-64 h-48"
      >
        {Movies.slice(0, 6).map((movie, index) => (
          <SwiperSlide key={index} className="relative rounded overflow-hidden">
            <img
              src={movie.imageUrl}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute bg-gradient-to-r from-transparent via-[#080a1ad6] to-[#080a1ad6] xl:pl-52 sm:pl-32 pl-8 top-0 bottom-0 right-0 left-0 flex flex-col justify-center lg:gap-8 md:gap-5 gap-4">
              <h1 className="xl:text-4xl truncate capitalize font-sans sm:text-2xl text-xl font-bold">{movie.title}</h1>
              <div className="flex gap-5 items-center text-dryGray">
                <FlexMovieItems movie={movie} />
              </div>
              <div className="flex gap-5 items-center">
                <Link to={`/movie/${movie.title}`} className="bg-subMain hover:text-main transition duration-500 ease-in-out text-white px-8 py-3 rounded font-medium sm:text-sm text-xs">View Detail</Link>
                <button className="bg-white hover:text-subMain transition duration-500 ease-in-out text-white px-5 py-3 rounded text-sm bg-opacity-30"><FaHeart className="size-3"/></button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banners;
