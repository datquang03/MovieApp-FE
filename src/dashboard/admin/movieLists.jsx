import { useDispatch, useSelector } from "react-redux";
import Table from "../../components/Table";
import Sidebar from "../Sidebar";
import { useEffect } from "react";
import toast from "react-hot-toast";
import {
  deleteAllMoviesAction,
  deleteMovieAction,
  getAllMoviesAction,
} from "../../../redux/action/movie.action";
import Loader from "../../components/notifications/Loader";
import { RiMovie2Line } from "react-icons/ri";
const MoviesList = () => {
  const dispatch = useDispatch();
  const sameClass =
    "w-full gap-6 flex justify-center items-center flex-col min-h-screen";

  const { isLoading, isError, movies } = useSelector(
    (state) => state.getAllMovies
  );
  const { isLoading: deleteLoading, isError: deleteError } = useSelector(
    (state) => state.adminDeleteMovie
  );
  const { isLoading: deleteAllLoading, isError: deleteAllError } = useSelector(
    (state) => state.adminDeleteAllMovies
  );

  // delete movie handler
  const deleteMovieHandler = (id) => {
    window.confirm("Are you sure that you want to delete this movie ?");
    dispatch(deleteMovieAction(id));
  };
  // delete all movies handler
  const deleteAllMoviesHandler = () => {
    window.confirm("Are you sure that you want to delete all movies ?");
    dispatch(deleteAllMoviesAction());
  };
  useEffect(() => {
    dispatch(getAllMoviesAction({}));
    if (isError || deleteError || deleteAllError)
      toast.error("Something went wrong");
  }, [dispatch, isError, deleteError, deleteAllError]);

  return (
    <Sidebar>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-xl font-bold text-white">Movies List</h2>
          {movies?.length > 0 && (
            <button
              disabled={deleteAllLoading}
              onClick={deleteAllMoviesHandler}
              className="bg-main font-medium hover:bg-subMain border border-subMain text-white p-4 rounded py-3 px-6 transition duration-500 ease-in-out"
            >
              {deleteAllLoading ? "Deleting...." : "Delete All"}
            </button>
          )}
        </div>
        {isLoading || deleteLoading ? (
          <Loader />
        ) : movies?.length > 0 ? (
          <>
            <Table
              data={movies}
              admin={false}
              onDeleteHandler={deleteMovieHandler}
            />
          </>
        ) : (
          <div className={sameClass}>
            <div className="flex justify-center items-center flex-col w-24 h-24 p-5 mb-4 rounded-full bg-dry text-subMain text-4xl">
              <RiMovie2Line />
            </div>
            <p className="text-border text-sm">No movies found</p>
          </div>
        )}
      </div>
    </Sidebar>
  );
};

export default MoviesList;
