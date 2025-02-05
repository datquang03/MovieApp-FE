import { useState } from "react"
import Titles from "../../../components/Titles"
import { Autoplay, Navigation } from "swiper/modules"; // ✅ Import Autoplay
import {BsBookmarkStarFill, BsCaretLeftFill, BsCaretRightFill} from "react-icons/bs"
import {Swiper, SwiperSlide} from "swiper/react"
import {Movies} from "/data/movies.db.js"
import {FaHeart} from "react-icons/fa"
import { Link } from "react-router-dom";
import Ratings from "../../../components/Stars";
const TopRatedMovies = () => {
  const [next, setNext] = useState(null)
  const [prev, setPrev] = useState(null)
  const classNames = "hover:bg-dry transition duration-500 ease-in-out text-sm rounded size-8 flex justify-center items-center bg-subMain text-white";
  return (
    <div className="my-16">
      <Titles title="Top Rated Movies" Icon={BsBookmarkStarFill}/>
      <div className="mt-10">
        <Swiper navigation={{ nextEl: next, prevEl: prev, hide: true }}  slidesPerView={4} spaceBetween={40} autoplay={true} speed={1000} modules={[Navigation, Autoplay]} >
          {
            Movies.map((movie, index) => (
              <SwiperSlide key={index}>
                <div className="p-4 h-rate  border border-border bg-dry rounded-lg overflow-hidden">
                  <img src={movie.imageUrl} alt={movie.title} className="w-full h-full object-cover rounded-lg"/>
                  <div className="px-4 gap-6 text-center absolute bg-black bg-opacity-70 top-0 left-0 right-0 bottom-0 flex justify-center items-center flex-col">
                    <button className="size-12 flex justify-center items-center transition duration-500 ease-in-out hover:bg-subMain rounded-full bg-white bg-opacity-30 text-white">
                      <FaHeart />
                    </button>
                    <Link className="font-semibold text-xl truncated line-clamp-2" to={`/movie/${movie.title}`}>{movie.title}</Link>
                    <div className="flex gap-2 text-star">
                      <Ratings value={movie.rate}/>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))
          }
        </Swiper>
        <div className="w-full px-1 flex-rows gap-6 pt-12">
          <button className={classNames} ref={(node) => setPrev(node)}><BsCaretLeftFill /></button>
          <button className={classNames} ref={(node) => setNext(node)}><BsCaretRightFill /></button>
        </div>
      </div>
    </div>
  )
}

export default TopRatedMovies
