import { useParams } from "react-router-dom";
import Layout from "../../components/layout/layout";
import { Movies } from "/data/movies.db.js";
import MovieInfo from "../single/MovieInfo";
const SingleMoviePage = () => {
  const { id } = useParams();
  const movie = Movies.find((movie) => movie.title === id);
  return (
    <Layout>
      <MovieInfo movie={movie} />
    </Layout>
  );
};

export default SingleMoviePage;
