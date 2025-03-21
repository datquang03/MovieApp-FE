/* eslint-disable react/prop-types */
import Titles from "../../../components/Titles";
import { BsCollectionFill } from "react-icons/bs";
import Movie from "../../../components/Movie";
import Loader from "../../../components/notifications/Loader";
import { RiMovie2Line } from "react-icons/ri";
const PopularMovies = ({ movies, isLoading }) => {
  return (
    <div className="my-16">
      <Titles title="Popular Movies" Icon={BsCollectionFill} />
      {isLoading ? (
        <Loader />
      ) : movies?.length > 0 ? (
        <div className="grid sm:mt-12 mt-6 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
          {movies.slice(0, 8).map((movie, index) => (
            <Movie key={index} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="mt-6">
          <div className="w-24 h-24 p-5 rounded-full mb-4 bg-dry text-subMain text-4xl flex flex-col justify-center items-center">
            <RiMovie2Line />
            <p className="text-border text-sm">No movies found</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PopularMovies;
