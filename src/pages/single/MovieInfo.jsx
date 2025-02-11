/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import FlexMovieItems from "../../components/FlexMovieItems";
import { FaPlay, FaShareAlt } from "react-icons/fa";
import { FiLogIn } from "react-icons/fi";
const MovieInfo = ({ movie }) => {
  return (
    <div className="w-full xl:h-screen relative text-white">
      <img
        src={movie.imageUrl}
        alt={movie.title}
        className="w-full hidden xl:inline-block h-full object-cover"
      />
      <div className="xl:bg-main bg-dry flex justify-center items-center xl:bg-opacity-90 xl:absolute top-0 bottom-0 right-0 left-0">
        <div className="container px-3 mx-auto 2xl:px-32 xl:grid grid-cols-3 flex items-center justify-center py-10 lg:py-20 gap-8">
          <div className="xl:col-span-1 w-full xl:order-none order-last h-header bg-dry border border-gray-800 rounded-lg overflow-hidden">
            <img
              src={movie.imageUrl}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="col-span-2 md:grid grid-cols-5 gap-4 items-center">
            <div className="col-span-3 flex flex-col gap-10">
              {/* Title */}
              <h1 className="xl:text-4xl capitalize font-sans text-2xl font-bold">
                {movie.title}
              </h1>
              {/* flex items */}
              <div className="flex items-center gap-4 font-medium text-dryGray">
                <div className="flex items-center justify-center text-xs px-2 py-1 bg-subMain">
                  HD 4K
                </div>
                <FlexMovieItems movie={movie && movie} />
              </div>
              {/* description */}
              <p className="text-text text-sm leading-7">{movie.desc}</p>
              <div className="grid sm:grid-cols-5 grid-cols-3 gap-4 p-6 bg-main border border-gray-800 rounded-lg">
                {/* share  */}
                <div className="col-span-1 flex items-center justify-center border-r border-border">
                  <button className="size-10 flex items-center justify-center rounded-lg bg-white bg-opacity-20">
                    <FaShareAlt />
                  </button>
                </div>
                {/* language */}
                <div className="col-span-2 flex items-center justify-center font-medium text-sm">
                  <p>
                    Language : {""}{" "}
                    <span className="ml-2 truncate">{movie.language}</span>
                  </p>
                </div>
                {/* watch button */}
                <div className="sm:col-span-2 col-span-3 flex justify-end font-medium text-sm">
                  <Link
                    to={`/watch/${movie.title}`}
                    className="bg-dry hover:bg-subMain transition duration-500 ease-in-out border-2 border-subMain rounded-full flex flex-row items-center justify-center gap-4 w-full sm:py-3"
                  >
                    <FaPlay className="size-3" />
                    Watch Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-2 md:mt-0 mt-2 flex justify-end">
            <button className="md:w-1/4 w-full relative flex items-center flex-col justify-center bg-subMain hover:bg-transparent transition duration-500 ease-in-out border-2 border-subMain md:h-64 h-20 rounded font-medium">
              <div className="flex flex-row items-center justify-center gap-6 text-md uppercase tracking-widest absolute md:rotate-90">
                Download <FiLogIn className="size-6" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieInfo;
