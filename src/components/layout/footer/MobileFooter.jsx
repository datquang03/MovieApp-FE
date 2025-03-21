import { BsCollectionPlay } from "react-icons/bs";
import { CgMenuBoxed } from "react-icons/cg";
import { FiHeart, FiUserCheck } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import MenuDrawer from "../../drawer/MenuDrawer";
import { useSelector } from "react-redux";

const MobileFooter = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { likedMovies } = useSelector((state) => state.userGetFavoriteMovies);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const active = "bg-red text-red-900";
  const inActive =
    "transition duration-500 ease-in-out text-2xl flex flex-col justify-center items-center hover:bg-white hover:text-main text-white rounded-md px-4 py-3";

  const Hover = ({ isActive }) =>
    isActive ? `${active} ${inActive}` : inActive;

  return (
    <>
      <MenuDrawer drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} />

      <div className="flex justify-between items-center h-full bg-white rounded cursor-pointer overflow-y-scroll flex-grow flex-row w-full">
        <footer className="lg:hidden fixed z-50 bottom-0 w-full px-1">
          <div className="bg-dry rounded-md flex justify-between items-center w-full p-1">
            <NavLink to={"/movies"} className={Hover}>
              <BsCollectionPlay />
            </NavLink>
            <div className="relative">
              <NavLink to={"/favorites"} className={Hover}>
                <div className="size-4 flex flex-col justify-center items-center rounded-full text-xs bg-subMain text-white absolute top-2 right-4">
                  {likedMovies?.length}
                </div>
                <FiHeart />
              </NavLink>
            </div>
            <NavLink to={"/login"} className={Hover}>
              <FiUserCheck />
            </NavLink>
            <button onClick={toggleDrawer} className={inActive}>
              <CgMenuBoxed />
            </button>
          </div>
        </footer>
      </div>
    </>
  );
};

export default MobileFooter;
