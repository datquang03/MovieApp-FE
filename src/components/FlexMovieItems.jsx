/* eslint-disable react/prop-types */
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoIosTime } from "react-icons/io";
const FlexMovieItems = ({ movie }) => {
  return (
    <>
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold">{movie?.category}</span>
      </div>
      <div className="flex items-center gap-2">
        <FaRegCalendarAlt className="text-subMain size-3" />
        <span className="text-sm font-semibold">{movie?.year}</span>
      </div>
      <div className="flex items-center gap-2">
        <IoIosTime className="text-subMain size-3" />
        <span className="text-sm font-semibold">{movie?.time}</span>
      </div>
    </>
  );
};

export default FlexMovieItems;
