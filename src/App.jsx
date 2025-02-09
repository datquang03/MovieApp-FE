import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login/LoginPage";
import HomePage from "./pages/home/HomePage";
import RegisterPage from "./pages/register/RegisterPage";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import NotFoundPage from "./pages/not-found/NotFoundPage";
import AboutUsPage from "./pages/about-us/AboutUsPage";
import MoviesPage from "./pages/movies/MoviesPage";
import ContactPage from "./pages/contact/ContactPage";
import FavoritesPage from "./pages/favorites/FavoritesPage";
import ChangePassword from "./dashboard/password";
import SingleMoviePage from "./pages/movie/SingleMoviePage";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="favorites" element={<FavoritesPage />} />
        <Route path="password" element={<ChangePassword />} />
        <Route path="/movie/:id" element={<SingleMoviePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
