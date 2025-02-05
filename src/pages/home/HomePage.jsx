import Layout from "../../components/layout/layout";
import Banners from "./components/Banners";
import PopularMovies from "./components/PopularMovies";
import Promos from "./components/Promos";
import TopRatedMovies from "./components/TopRatedMovies";

const HomePage = () => {
  return (
    <Layout>
      <div className="container mx-auto min-h-screen px-2 mb-6 ">
        <Banners />
        <PopularMovies />
        <Promos />
        <TopRatedMovies />
      </div>
    </Layout>
  );
};

export default HomePage;
