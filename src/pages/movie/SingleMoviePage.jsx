import { useParams } from "react-router-dom";
import MovieInfo from "../single/MovieInfo";
import MovieCasts from "../single/MovieCasts";
import MovieRates from "../single/MovieRates";
import Titles from "../../components/Titles";
import {
  BsCaretLeftFill,
  BsCaretRightFill,
  BsCollectionFill,
} from "react-icons/bs";
import Movie from "../../components/Movie";
import { SwiperSlide, Swiper } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { useEffect, useState } from "react";
import ShareModal from "../../components/modals/ShareModal";
import Layout from "../../components/layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllMoviesAction,
  getMovieByIdAction,
} from "../../../redux/action/movie.action";
import Loader from "../../components/notifications/Loader";
import { RiMovie2Line } from "react-icons/ri";

const SingleMoviePage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const sameClass =
    "w-full gap-6 flex justify-center items-center flex-col min-h-screen";
  const { id } = useParams();
  const [next, setNext] = useState(null);
  const [prev, setPrev] = useState(null);
  const classNames =
    "hover:bg-dry transition duration-500 ease-in-out text-sm rounded size-8 flex justify-center items-center bg-subMain text-white";

  const dispatch = useDispatch();

  const { isLoading, isError, movie } = useSelector(
    (state) => state.getMovieById
  );
  const { movies } = useSelector((state) => state.getAllMovies);
  // related movie
  const RelatedMovies = movies?.filter((m) => m?.category === movie?.category);

  useEffect(() => {
    dispatch(getAllMoviesAction({}));
    dispatch(getMovieByIdAction(id));
  }, [dispatch, id]);
  return (
    <Layout>
      {isLoading ? (
        <div className={sameClass}>
          <Loader />
        </div>
      ) : isError ? (
        <div className={sameClass}>
          <div className="flex justify-center items-center flex-col w-24 h-24 p-5 mb-4 rounded-full bg-dry text-subMain text-4xl">
            <RiMovie2Line />
          </div>
          <p className="text-border text-sm">Can not find movie with {id}</p>
        </div>
      ) : (
        <>
          <ShareModal
            movie={movie}
            setModalOpen={setModalOpen}
            z
            modalOpen={modalOpen}
          />
          <MovieInfo movie={movie} setModalOpen={setModalOpen} />
          <div className="container mx-auto min-h-screen px-2 my-6">
            <MovieCasts movie={movie} />
            <MovieRates movie={movie} />
            {RelatedMovies?.length > 0 && (
              <div className="my-16">
                <Titles title="Related Movie" Icon={BsCollectionFill} />
                <div className="mt-8" />
                <Swiper
                  navigation={{ nextEl: next, prevEl: prev, hide: true }}
                  slidesPerView={4}
                  spaceBetween={40}
                  breakpoints={{
                    0: { slidesPerView: 1 },
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 4 },
                  }}
                  autoplay={true}
                  speed={1000}
                  modules={[Navigation, Autoplay]}
                >
                  {RelatedMovies.map((movie) => (
                    <SwiperSlide key={movie?._id}>
                      <Movie movie={movie} />
                    </SwiperSlide>
                  ))}
                </Swiper>
                <div className="w-full px-1 flex-rows gap-6 pt-12">
                  <button className={classNames} ref={(node) => setPrev(node)}>
                    <BsCaretLeftFill />
                  </button>
                  <button className={classNames} ref={(node) => setNext(node)}>
                    <BsCaretRightFill />
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </Layout>
  );
};

export default SingleMoviePage;
