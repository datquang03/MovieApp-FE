import Sidebar from "../Sidebar";
import { FaRegListAlt, FaUser } from "react-icons/fa";
import { HiViewGridAdd } from "react-icons/hi";
import Table from "../../components/Table";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { getAllCategoriesAction } from "../../../redux/action/category.action";
import { getAllUsersAction } from "../../../redux/action/user.action";
import {
  deleteMovieAction,
  getAllMoviesAction,
} from "../../../redux/action/movie.action";
import Loader from "../../components/notifications/Loader";
import { RiMovie2Line } from "react-icons/ri";

const Dashboard = () => {
  const dispatch = useDispatch();
  const sameClass =
    "w-full gap-6 flex justify-center items-center flex-col min-h-screen";

  const {
    isLoading: catLoading,
    isError: catError,
    categories,
  } = useSelector((state) => state.getAllCategories);

  const {
    isLoading: userLoading,
    isError: userError,
    users,
  } = useSelector((state) => state.adminGetAllUsers);

  const { isLoading, isError, movies, totalMovies } = useSelector(
    (state) => state.getAllMovies
  );
  const { isLoading: deleteLoading, isError: deleteError } = useSelector(
    (state) => state.adminDeleteMovie
  );
  // delete movie handler
  const deleteMovieHandler = (id) => {
    window.confirm("Are you sure that you want to delete this movie ?");
    dispatch(deleteMovieAction(id));
  };
  useEffect(() => {
    dispatch(getAllUsersAction());
    dispatch(getAllMoviesAction({}));
    dispatch(getAllCategoriesAction());
    if (isError || catError || userError || deleteError) {
      toast.error("Something went wrong");
    }
  }, [isError, catError, userError, dispatch, deleteError]);
  const DashboardData = [
    {
      bg: "bg-orange-600",
      icon: FaRegListAlt,
      title: "Total Movies",
      total: isLoading ? "Get all movies..." : totalMovies || 0,
    },
    {
      bg: "bg-blue-700",
      icon: HiViewGridAdd,
      title: "Total Categories",
      total: catLoading ? "Get all categories..." : categories?.length || 0,
    },
    {
      bg: "bg-green-600",
      icon: FaUser,
      title: "Total Users",
      total: userLoading ? "Get all users..." : users?.length || 0,
    },
  ];
  return (
    <Sidebar>
      <h2 className="text-xl font-bold">Dashboard</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {DashboardData.map((data, index) => (
          <div
            key={index}
            className="p-4 bg-main border-border grid grid-cols-4 rounded-md gap-2"
          >
            {" "}
            <div
              className={`col-span-1 rounded-full size-12 flex justify-center items-center flex-col ${data.bg}`}
            >
              <data.icon className="w-6 h-6" />
            </div>{" "}
            <div className="col-span-3">
              <h2>{data.title}</h2>
              <p className=" mt-2 font-bold">{data.total}</p>
            </div>
          </div>
        ))}
      </div>
      <h3 className="text-md font-medium my-6 text-border">Recent Movies</h3>
      {isLoading || deleteLoading ? (
        <Loader />
      ) : movies?.length > 0 ? (
        <Table
          data={movies.slice(0, 5)}
          admin={false}
          onDeleteHandler={deleteMovieHandler}
        />
      ) : (
        <div className={sameClass}>
          <div className="flex justify-center items-center flex-col w-24 h-24 p-5 mb-4 rounded-full bg-dry text-subMain text-4xl">
            <RiMovie2Line />
          </div>
          <p className="text-border text-sm">No movies found</p>
        </div>
      )}
    </Sidebar>
  );
};

export default Dashboard;
