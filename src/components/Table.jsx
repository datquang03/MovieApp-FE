/* eslint-disable react/prop-types */
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { GoEye } from "react-icons/go";
import mainBg from "../../assets/mainbg.png";
import { FaEdit } from "react-icons/fa";

const Head = "text-xs text-left text-main font-semibold px-6 py-2 uppercase";
const Text = "text-xs text-left leading-6 whitespace-nowrap px-5 py-3";

const Rows = (movie, i, onDeleteHandler, admin) => (
  <tr key={i}>
    <td className={`${Text}`}>
      <div className="w-12 p-1 bg-dry border border-border h-12 rounded overflow-hidden">
        <img
          src={movie.image || mainBg}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
      </div>
    </td>
    <td className={`${Text} truncate`}>{movie?.name}</td>
    <td className={`${Text}`}>{movie?.category}</td>
    <td className={`${Text}`}>{movie?.language}</td>
    <td className={`${Text}`}>{movie?.year}</td>
    <td className={`${Text}`}>{movie?.time}</td>
    <td
      className={`${Text} float-right flex flex-row items-center justify-center gap-2`}
    >
      {admin ? (
        <>
          <Link
            to={`/movie/${movie._id}`}
            className="bg-subMain text-white rounded flex flex-col justify-center items-center size-8"
          >
            <GoEye className="text-white size-5" />
          </Link>
        </>
      ) : (
        <>
          <Link
            to={`/editMovie/${movie._id}`}
            className="group border border-border bg-dry flex flex-row justify-center items-center gap-2 text-border rounded py-1 px-2 hover:bg-green-500 hover:text-white transition duration-500 ease-in-out"
          >
            Edit{" "}
            <FaEdit className="text-green-500 group-hover:text-white transition duration-500 ease-in-out" />
          </Link>
          <button
            onClick={() => onDeleteHandler(movie._id)}
            className="bg-subMain text-white rounded flex flex-col justify-center items-center size-8"
          >
            <MdDelete className="text-white size-5" />
          </button>
        </>
      )}
    </td>
  </tr>
);

const Table = ({ data, onDeleteHandler, admin }) => {
  return (
    <div className="relative w-full">
      <div className="max-h-[400px] overflow-y-auto hidden-scrollbar">
        <table className="min-w-max w-full table-auto border border-border divide-y divide-border">
          <thead>
            <tr className="bg-dryGray">
              <th scope="col" className={`${Head}`}>
                Image
              </th>
              <th scope="col" className={`${Head}`}>
                Name
              </th>
              <th scope="col" className={`${Head}`}>
                Category
              </th>
              <th scope="col" className={`${Head}`}>
                Language
              </th>
              <th scope="col" className={`${Head}`}>
                Year
              </th>
              <th scope="col" className={`${Head}`}>
                Time
              </th>
              <th scope="col" className={`${Head} text-end`}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-main divide-y divide-gray-800">
            {data.map((movie, i) => Rows(movie, i, onDeleteHandler, admin))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
