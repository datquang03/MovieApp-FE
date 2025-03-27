import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css"; // Import CSS của AOS
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import LoginPage from "./pages/login/LoginPage";
import HomePage from "./pages/home/HomePage";
import RegisterPage from "./pages/register/RegisterPage";
import NotFoundPage from "./pages/not-found/NotFoundPage";
import AboutUsPage from "./pages/about-us/AboutUsPage";
import MoviesPage from "./pages/movies/MoviesPage";
import ContactPage from "./pages/contact/ContactPage";
import ChangePassword from "./dashboard/password";
import SingleMoviePage from "./pages/movie/SingleMoviePage";
import WatchPage from "./pages/watch/WatchPage";
import ProfilePage from "./dashboard/ProfilePage";
import FavoriteMovies from "./dashboard/favoriteMovies";
import MoviesList from "./dashboard/admin/movieLists";
import Dashboard from "./dashboard/admin/dashboard";
import Categories from "./dashboard/admin/categories";
import Users from "./dashboard/admin/users";
import AddMovie from "./dashboard/admin/addMovies";
import { SidebarProvider } from "./context/DrawerContext";
import ScrollOnTop from "./components/ScrollOnTop";
import ToastContainer from "./components/notifications/ToastContainer";
import {
  AdminProtectedRouter,
  ProtectedRouter,
} from "./components/ProtectedRouter";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategoriesAction } from "../redux/action/category.action";
import { getFavoriteMoviesAction } from "../redux/action/user.action";
import toast from "react-hot-toast";
import EditMovie from "./dashboard/admin/editMovies";
import MessagePage from "./pages/message/MessagePage";

const App = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);
  const { isSuccess, isError } = useSelector((state) => state.userLikeMovie);
  const { isError: catError } = useSelector((state) => state.getAllCategories);
  useEffect(() => {
    Aos.init({
      duration: 800,
      offset: 50,
      once: true,
    });
    dispatch(getAllCategoriesAction());
    if (userInfo) {
      dispatch(getFavoriteMoviesAction());
    }
    if (isError || catError) {
      toast.error("You have already liked this movie");
      dispatch({ type: "LIKE_MOVIE_RESET" });
    }
    if (isSuccess) {
      dispatch({ type: "LIKE_MOVIE_RESET" });
    }
  }, [dispatch, userInfo, isError, catError, isSuccess]);

  return (
    <BrowserRouter>
      <ToastContainer />
      <ScrollOnTop />
      <SidebarProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:search" element={<MoviesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/movie/:id" element={<SingleMoviePage />} />
          <Route path="/watch/:id" element={<WatchPage />} />
          {/* Protected Routes */}
          <Route element={<ProtectedRouter />}>
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/favorites" element={<FavoriteMovies />} />
            <Route path="/password" element={<ChangePassword />} />
            <Route path="/message/:id" element={<MessagePage />} />
            <Route path="/message" element={<MessagePage />} />
          </Route>
          {/* Admin Routes */}
          <Route element={<AdminProtectedRouter />}>
            <Route path="/movieslist" element={<MoviesList />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/users" element={<Users />} />
            <Route path="/addMovie" element={<AddMovie />} />
            <Route path="/editMovie/:id" element={<EditMovie />} />
          </Route>
        </Routes>
      </SidebarProvider>
    </BrowserRouter>
  );
};

export default App;
