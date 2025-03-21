import { memo, useMemo, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { IoSearchSharp } from "react-icons/io5";
import { FaUser, FaHeart } from "react-icons/fa6";
import mainbg from "../../../../assets/mainbg.png";
import userImage from "/assets/userImg.jpg";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.userLogin);
  const { likedMovies } = useSelector((state) => state.userGetFavoriteMovies);

  // Memoize userInfo để tránh re-render không cần thiết
  const memoizedUserInfo = useMemo(() => userInfo, [userInfo]);

  const hover =
    "hover:text-subMain transition duration-500 ease-in-out text-white text-xl pr-2";
  const Hover = ({ isActive }) =>
    isActive ? "text-subMain transition duration-500 ease-in-out" : hover;

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/movies/${search}`);
      setSearch(search);
    } else {
      navigate("/movies");
    }
  };
  return (
    <div className="bg-main shadow-md sticky top-0 z-20">
      <div className="container mx-auto py-2 px-2 lg:grid grid-cols-7 gap-10 justify-between items-center">
        {/* Logo */}
        <div className="col-span-1 lg:block hidden">
          <img
            onClick={() => navigate("/")}
            src={mainbg}
            className="w-full h-15 cursor-pointer object-contain"
            alt="logo"
          />
        </div>

        {/* Search Bar */}
        <div className="col-span-3">
          <form
            onSubmit={handleSearch}
            className="w-full text-sm bg-dryGray rounded flex flex-row-reverse justify-between items-center gap-4"
          >
            <button
              type="submit"
              className="bg-subMain w-12 flex justify-center items-center h-12 rounded"
            >
              <IoSearchSharp className="text-2xl" />
            </button>
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for movies"
              className="font-medium placeholder:text-border text-sm w-11/12 h-12 bg-transparent border-none px-2 text-black text-xl"
            />
          </form>
        </div>

        {/* Menu Bar */}
        <div className="col-span-3 font-medium text-sm hidden xl:gap-14 2xl:gap-20 justify-between lg:flex xl:justify-end items-center">
          <NavLink to="/movies" className={Hover}>
            Movies
          </NavLink>
          <NavLink to="/contact" className={Hover}>
            Contact
          </NavLink>
          <NavLink to="/about" className={Hover}>
            About
          </NavLink>

          {/* User Profile */}
          <NavLink
            to={
              memoizedUserInfo?.isAdmin
                ? "/dashboard"
                : memoizedUserInfo
                ? "/profile"
                : "/login"
            }
            className={Hover}
          >
            {memoizedUserInfo ? (
              <img
                src={memoizedUserInfo?.image || userImage}
                alt={memoizedUserInfo?.fullName}
                className="size-10 rounded-full object-cover border border-subMain"
              />
            ) : (
              <FaUser className="size-8" />
            )}
          </NavLink>

          {/* Favorites */}
          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              `${Hover({ isActive })} relative pr-2 flex items-center`
            }
          >
            <FaHeart
              size={23}
              className="transition duration-500 ease-in-out hover:text-subMain"
            />
            <div className="w-5 h-5 flex justify-center items-center rounded-full text-xs bg-subMain text-white absolute -top-3 -right-1">
              {likedMovies?.length}
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default memo(Navbar);
