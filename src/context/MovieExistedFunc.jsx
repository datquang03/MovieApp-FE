import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { likeMovieAction } from "../../redux/action/user.action";
// check if movie existed in favorite
const IfLikedMovies = (movie) => {
  const { likeMovies } = useSelector((state) => state.userGetFavoriteMovies);
  return likeMovies?.find((likeMovie) => likeMovie?._id === movie?._id);
};

// like movie function
const LikeMovie = (movie, dispatch, userInfo) => {
  return !userInfo
    ? toast.error("Please login to like movie")
    : dispatch(likeMovieAction({ movieId: movie?._id }));
};
export { IfLikedMovies, LikeMovie };
