import { useDispatch, useSelector } from "react-redux";
import Table from "../components/Table";
import Sidebar from "./Sidebar";
import { useEffect } from "react";
import {
  deleteAllFavoriteMoviesAction,
  getFavoriteMoviesAction,
} from "../../redux/action/user.action";
import toast from "react-hot-toast";
import Loader from "../components/notifications/Loader";
import { useNavigate } from "react-router-dom";

const FavoriteMovies = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Lấy danh sách phim yêu thích
  const { isError, isLoading, likedMovies } = useSelector(
    (state) => state.userGetFavoriteMovies
  );

  // Trạng thái xóa phim
  const {
    isLoading: loadingDelete,
    isError: deleteError,
    isSuccess, // Cái này để kiểm tra xóa thành công
  } = useSelector((state) => state.userDeleteAllFavoriteMovies);

  // Hàm xoá phim
  const deleteMovieHandler = () => {
    if (
      window.confirm("Are you sure you want to delete all favorite movies?")
    ) {
      dispatch(deleteAllFavoriteMoviesAction());
    }
  };

  // useEffect để tự động cập nhật danh sách sau khi xóa
  useEffect(() => {
    if (isError) toast.error(isError);
    if (deleteError) toast.error(deleteError);
    dispatch(getFavoriteMoviesAction());
  }, [dispatch, isError, deleteError]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(getFavoriteMoviesAction()); // Gọi lại API sau khi xóa thành công
      dispatch({ type: "DELETE_ALL_FAVORITE_MOVIES_RESET" });
    }
  }, [dispatch, isSuccess]);

  return (
    <Sidebar>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-xl font-bold text-white">Favorite Movies</h2>
          {likedMovies?.length > 0 && (
            <button
              disabled={loadingDelete}
              className="bg-subMain font-medium hover:bg-main border border-subMain text-white p-4 rounded py-3 px-6 transition duration-500 ease-in-out"
              onClick={deleteMovieHandler}
            >
              {loadingDelete ? "Deleting..." : "Delete all"}
            </button>
          )}
        </div>
        {isLoading ? (
          <Loader />
        ) : likedMovies?.length > 0 ? (
          <Table data={likedMovies} admin={false} />
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[300px] space-y-4 text-center">
            <div className="border-t border-dashed border-gray-500 w-full pt-4" />
            <div className="relative bg-green-400 rounded-xl w-40 h-52 flex flex-col items-center justify-center shadow-lg">
              <div className="absolute top-8 left-1/2 -translate-x-1/2 w-24 h-24 bg-yellow-200 rounded-full flex items-center justify-center">
                <div
                  className="w-16 h-16 bg-black rounded-full flex items-center justify-center cursor-pointer scale-100 hover:scale-110 transition duration-500 ease-in-out"
                  onClick={() => navigate("/movies")}
                >
                  <span className="text-orange-400 text-6xl">★</span>
                </div>
              </div>
              <div className="absolute bottom-4 left-6 w-16 h-1 bg-black rounded transform rotate-[20deg]"></div>
            </div>
            <h2 className="text-lg font-bold text-gray-800">No Favourites</h2>
            <p className="text-gray-500 px-4">
              You can add an item to your favourites by clicking{" "}
              <span className="font-medium">“Star Icon”</span>
            </p>
          </div>
        )}
      </div>
    </Sidebar>
  );
};

export default FavoriteMovies;
