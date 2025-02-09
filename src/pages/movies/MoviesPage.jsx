import Filters from "../../components/Filters";
import Layout from "../../components/layout/layout";
import { Movies } from "/data/movies.db.js";
import Movie from "../../components/Movie";
import { useState } from "react";
import { CgSpinner } from "react-icons/cg";
const MoviesPage = () => {
  const maxPage = 5;
  const [page, setPage] = useState(maxPage);
  const loadingMore = () => {
    setPage(page + maxPage);
  };
  return (
    <Layout>
      <div className="min-h-screen container mx-auto px-2 py-6">
        <Filters />
        <p className="text-lg font-medium my-6">
          Total{" "}
          <span className="font-bold text-subMain">
            {Movies?.length} {""} items found
          </span>
        </p>
        <div className="grid sm:mt-10 mt-6 xl:grid-cols-4 2xl:grid-cols-5 lg:grid-cols-3 sm:grid-cols-2 gap-6">
          {Movies.slice(0, page)?.map((movie, index) => (
            <Movie key={index} movie={movie} />
          ))}
        </div>
        {/* Loading more button */}
        <div className="w-full flex justify-center items-center md:my-20 my-10">
          <button
            onClick={loadingMore}
            className="flex justify-between items-center gap-3 text-white py-3 px-8 rounded font-semibold border-2 border-subMain cursor-pointer "
          >
            Loading More
            <CgSpinner className="animate-spin" />
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default MoviesPage;
