/* eslint-disable react/prop-types */

import { Link } from "react-router-dom"
import {FaHeart} from "react-icons/fa"

const Movie = ({movie}) => {
  return (
    <>
      <div className="border border-border p-1 hover:scale-95 transition duration-500 ease-in-out relative rounded overflow-hidden">
        <Link to={`/movies/${movie.title}`} className="w-full">
        <img src={movie.imageUrl} alt={movie.title} className="w-full h-96 object-cover" />
        </Link>
        <div className="absolute flex justify-between items-center gap-2 bottom-0 right-0 left-0 bg-main bg-opacity-60 text-white px-4 py-3">
            <h3 className="font-semibold truncate">{movie?.title}</h3>
            <button className="size-9 text-sm flex justify-center items-center transition duration-500 ease-in-out hover:bg-transparent hover:text-subMain border-2 border-subMain rounded-md bg-subMain text-white "><FaHeart /></button>
        </div>
      </div>
    </>
  )
}

export default Movie
