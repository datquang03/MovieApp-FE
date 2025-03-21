/* eslint-disable react/prop-types */
import { FaUserFriends } from "react-icons/fa";
import Titles from "../../components/Titles";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import userImg from "/assets/userImage.png";

const MovieCasts = ({ movie }) => {
  return (
    movie?.casts?.length > 0 && (
      <div className="my-12">
        <Titles title="Casts" Icon={FaUserFriends} />
        <div className="mt-10">
          <Swiper
            autoplay={{ delay: 1000, disableOnInteraction: false }}
            spaceBetween={10}
            loop={true}
            speed={1000}
            modules={[Autoplay]}
            breakpoints={{
              0: { slidesPerView: 1 },
              400: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
              1280: { slidesPerView: 5, spaceBetween: 30 },
            }}
          >
            {movie?.casts.map((cast) => (
              <SwiperSlide key={cast._id}>
                <div className="w-full p-3 italic text-xs text-text rounded flex flex-col items-center justify-center bg-main border border-gray-800">
                  <img
                    src={cast?.image || userImg}
                    alt={cast?.name}
                    className="w-full h-64 rounded mb-4 object-cover"
                  />
                  <p>{cast?.name || "Unknown"}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    )
  );
};

export default MovieCasts;
