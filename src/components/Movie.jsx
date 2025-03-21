/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import mainBg from "/assets/mainbg.png";
import { useDispatch, useSelector } from "react-redux";
import { IfLikedMovies, LikeMovie } from "../context/MovieExistedFunc";

const Movie = ({ movie }) => {
  const { isLoading } = useSelector((state) => state.userLikeMovie);
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);

  // if like function
  const isLiked = IfLikedMovies(movie);

  return (
    <>
      <div className="border border-border p-1 hover:scale-95 transition duration-500 ease-in-out relative rounded overflow-hidden">
        <Link
          to={`/movie/${movie?._id}`}
          className="w-full"
          state={{ movie: movie }}
        >
          <img
            src={movie?.image || mainBg}
            alt={movie?.name}
            className="w-full h-96 object-cover"
          />
        </Link>
        <div className="absolute flex justify-between items-center gap-2 bottom-0 right-0 left-0 bg-main bg-opacity-60 text-white px-4 py-3">
          <h3 className="font-semibold truncate">{movie?.name}</h3>
          <button
            onClick={() => LikeMovie(movie, dispatch, userInfo)}
            disabled={isLiked || isLoading}
            className={`size-9 text-sm flex justify-center items-center transition duration-500 ease-in-out ${
              isLiked ? "bg-subMain text-white" : "bg-transparent text-subMain"
            } hover:bg-transparent hover:text-subMain border-2 border-subMain rounded-md bg-subMain text-white`}
          >
            <FaHeart />
          </button>
        </div>
      </div>
    </>
  );
};

export default Movie;
