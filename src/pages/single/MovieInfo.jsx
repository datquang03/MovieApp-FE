/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import FlexMovieItems from "../../components/FlexMovieItems";
import { FaPlay, FaShareAlt } from "react-icons/fa";
import mainBg from "../../../assets/mainbg.png";
import Ratings from "../../components/Stars";

const MovieInfo = ({ movie, setModalOpen }) => {
  return (
    <div className="w-full xl:h-screen relative text-white">
      {/* Large screen background image */}
      <img
        src={movie?.image || mainBg}
        alt={movie?.name}
        className="w-full hidden xl:inline-block h-full object-cover"
      />
      <div className="xl:bg-main bg-dry flex justify-center items-center xl:bg-opacity-90 xl:absolute top-0 bottom-0 right-0 left-0">
        <div className="container px-3 mx-auto 2xl:px-32 flex flex-col xl:grid xl:grid-cols-3 items-center justify-center py-10 lg:py-20 gap-8">
          {/* Movie Image (Now Appears First on Small Screens) */}
          <div className="w-full md:order-none order-first xl:col-span-1 bg-dry border border-gray-800 rounded-lg overflow-hidden">
            <img
              src={movie?.image || mainBg}
              alt={movie?.name}
              className="w-full h-64 md:h-full object-cover"
            />
          </div>

          {/* Movie Info Section */}
          <div className="col-span-2 md:grid grid-cols-5 gap-4 items-center">
            <div className="col-span-3 flex flex-col gap-10">
              {/* Title */}
              <h1 className="xl:text-4xl capitalize font-sans text-2xl font-bold">
                {movie?.name}
              </h1>

              {/* Flex Items */}
              <div className="flex items-center gap-4 font-medium text-dryGray">
                <div className="flex items-center justify-center text-xs px-2 py-1 bg-subMain">
                  HD 4K
                </div>
                <FlexMovieItems movie={movie} />
              </div>

              {/* Description */}
              <p className="text-text text-sm leading-7">{movie?.desc}</p>
              {/* Ratings */}
              <div className="flex mb-6 text-lg gap-2 text-star">
                {Ratings({ value: movie?.rate })}
              </div>
              {/* Details Box */}
              <div className="grid sm:grid-cols-5 grid-cols-3 gap-4 p-6 bg-main border border-gray-800 rounded-lg">
                {/* Share Button */}
                <div className="col-span-1 flex items-center justify-center border-r border-border">
                  <button
                    onClick={() => setModalOpen(true)}
                    className="size-10 flex items-center justify-center rounded-lg bg-white bg-opacity-20"
                  >
                    <FaShareAlt />
                  </button>
                </div>

                {/* Language */}
                <div className="col-span-2 flex items-center justify-center font-medium text-sm">
                  <p>
                    Language :{" "}
                    <span className="ml-2 truncate">{movie?.language}</span>
                  </p>
                </div>

                {/* Watch & Download Buttons */}
                <div className="sm:col-span-2 col-span-3 flex flex-col gap-4 items-center font-medium text-sm">
                  <Link
                    to={`/watch/${movie?._id}`}
                    className="bg-dry hover:bg-subMain transition duration-500 ease-in-out border-2 border-subMain rounded-full flex flex-row items-center justify-center gap-4 w-full sm:py-3"
                  >
                    <FaPlay className="size-3" />
                    Watch Now
                  </Link>
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
