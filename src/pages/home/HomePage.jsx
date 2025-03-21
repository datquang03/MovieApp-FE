import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/layout/Layout";
import Banners from "./components/Banners";
import PopularMovies from "./components/PopularMovies";
import Promos from "./components/Promos";
import TopRatedMovies from "./components/TopRatedMovies";
import { useEffect } from "react";
import toast from "react-hot-toast";
import {
  getAllMoviesAction,
  getRandomMoviesAction,
  getTopRatedMoviesAction,
} from "../../../redux/action/movie.action";

const HomePage = () => {
  const dispatch = useDispatch();
  const {
    isLoading: randomLoading,
    isError: randomError,
    movies: randomMovies,
  } = useSelector((state) => state.getRandomMovies);
  const {
    isLoading: topLoading,
    isError: topError,
    movies: topMovies,
  } = useSelector((state) => state.getTopRatedMovies);
  const { isLoading, isError, movies } = useSelector(
    (state) => state.getAllMovies
  );
  useEffect(() => {
    dispatch(getRandomMoviesAction());
    dispatch(getTopRatedMoviesAction());
    dispatch(getAllMoviesAction({}));
    if (randomError || topError || isError) {
      toast.error(randomError || topError || isError);
    }
  }, [randomError, topError, isError, dispatch]);
  return (
    <Layout>
      <div className="container mx-auto min-h-screen px-2 mb-6 ">
        <Banners movies={movies} isLoading={isLoading} />
        <PopularMovies movies={randomMovies} isLoading={randomLoading} />
        <Promos />
        <TopRatedMovies movies={topMovies} isLoading={topLoading} />
      </div>
    </Layout>
  );
};

export default HomePage;
