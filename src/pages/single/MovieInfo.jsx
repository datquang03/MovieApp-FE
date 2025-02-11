import { FaShareAlt } from "react-icons/fa";
import FlexMovieItems from "../../components/FlexMovieItems";
import { FaPlay } from "react-icons/fa6";
import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
const MovieInfo = ({ movie }) => {
  return (
    <div className="w-full xl:h-screen relative text-white">
      <img
        src={movie?.imageUrl}
        alt={movie.title}
        className="w-full h-full xl:inline-block object-cover"
      />
      <div className="xl:bg-main bg-dry flex justify-center items-center xl:bg-opacity-90 xl:absolute top-0 right-0 left-0 bottom-0">
        <div className="container px-3 mx-auto 2xl:px-32 xl:grid grid-cols-3 flex justify-center items-center py-10 lg:py-20 gap-8">
          <div className="xl:col-span-1 w-full xl:order-none order-last h-header bg-dry border border-gray-800 rounded-lg overflow-hidden">
            <img
              src={movie?.imageUrl}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="xl:col-span-2 md:grid grid-cols-5 gap-4 items-center">
            <div className="col-span-3 flex flex-col gap-10">
              <h1 className="xl:text-4xl capitalize font-sans text-2xl font-bold">
                {movie.title}
              </h1>
              <div className="flex items-center gap-4 font-medium text-dryGray">
                <div className="flex items-center justify-center bg-subMain text-xs px-2 py-1">
                  HD 4K
                </div>
                <FlexMovieItems movie={movie && movie} />
              </div>
              <div className=" text-text text-sm leading-7">{movie.desc}</div>
              <div className="grid sm:grid-cols-5 grid-cols-3 gap-4 p-6  bg-main rounded-lg">
                <div className="col-span-1 flex items-center justify-center border-r border-border"></div>
                <button className="size-10 flex items-center justify-center rounded-lg bg-white bg-opacity-20">
                  <FaShareAlt />
                </button>
                <div className="col-span-2 flex items-center justify-center font-medium text-sm">
                  <p>
                    Language:{" "}
                    <span className="ml-2 truncate">{movie?.language}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieInfo;
