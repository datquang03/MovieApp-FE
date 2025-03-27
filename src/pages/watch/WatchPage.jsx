import { Link, useParams } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import { useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { FaHeart, FaPlay } from "react-icons/fa6";
import mainBg from "/assets/mainbg.png";
import { useDispatch, useSelector } from "react-redux";
import { getMovieByIdAction } from "../../../redux/action/movie.action";
import Loader from "../../components/notifications/Loader";
import { RiMovie2Line } from "react-icons/ri";
import { IfLikedMovies, LikeMovie } from "../../context/MovieExistedFunc";

const WatchPage = () => {
  let { id } = useParams();
  const dispatch = useDispatch();
  const [play, setPlay] = useState(false);
  const sameClass =
    "w-full gap-6 flex justify-center items-center flex-col min-h-screen";
  const { isLoading, isError, movie } = useSelector(
    (state) => state.getMovieById
  );
  const { isLoading: likeLoading } = useSelector(
    (state) => state.userLikeMovie
  );
  const { userInfo } = useSelector((state) => state.userLogin);

  const isLiked = IfLikedMovies(movie);

  useEffect(() => {
    dispatch(getMovieByIdAction(id));
  }, [dispatch, id]);

  // Hàm trích xuất video ID từ URL YouTube
  const getYouTubeVideoId = (url) => {
    if (!url) return null;
    const regex =
      // eslint-disable-next-line no-useless-escape
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const videoId = movie ? getYouTubeVideoId(movie.video) : null;

  return (
    <Layout>
      <div className="container mx-auto bg-dry p-6 mb-12">
        <div className="flex justify-between items-center flex-wrap mb-6 gap-2 bg-main rounded border border-gray-800 p-6">
          <Link
            to={`/movie/${movie?._id}`}
            className="md:text-xl text-sm flex gap-3 items-center font-bold text-dryGray"
          >
            <BiArrowBack className="size-5" />
            {movie?.name || "Loading..."}
          </Link>
          <div className="flex items-center justify-between sm:w-auto w-full gap-5">
            <button
              onClick={() => LikeMovie(movie, dispatch, userInfo)}
              disabled={isLoading || likeLoading || isLiked}
              className="bg-white hover:bg-main border hover:border-subMain hover:text-subMain transition duration-500 ease-in-out bg-opacity-30 text-white rounded px-4 py-3 text-sm"
            >
              <FaHeart />
            </button>
          </div>
        </div>
        {/* Watch video */}
        {play && videoId ? (
          <div className="w-full h-screen rounded-lg overflow-hidden relative">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
              title={movie?.name}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-lg"
            />
          </div>
        ) : (
          <div className="w-full h-screen rounded-lg overflow-hidden relative">
            {isLoading ? (
              <div className={sameClass}>
                <Loader />
              </div>
            ) : isError ? (
              <div className={sameClass}>
                <div className="flex justify-center items-center flex-col w-24 h-24 p-5 mb-4 rounded-full bg-dry text-subMain text-4xl">
                  <RiMovie2Line />
                </div>
                <p className="text-border text-sm">{isError}</p>
              </div>
            ) : !movie ? (
              <div className={sameClass}>
                <p className="text-border text-sm">Movie not found</p>
              </div>
            ) : (
              <>
                <div className="absolute top-0 bottom-0 right-0 left-0 bg-main bg-opacity-30 flex flex-col items-center justify-center">
                  <button
                    onClick={() => setPlay(true)}
                    className="bg-subMain text-white hover:bg-opacity-30 flex items-center justify-center flex-col transition duration-500 ease-in-out rounded-full w-20 h-20 font-medium text-xl"
                  >
                    <FaPlay />
                  </button>
                </div>
                <img
                  src={movie?.image || mainBg}
                  alt={movie?.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default WatchPage;
