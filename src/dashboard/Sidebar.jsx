/* eslint-disable react/prop-types */
import { BsFillGridFill } from "react-icons/bs";
import { FaHeart, FaListAlt, FaUser } from "react-icons/fa";
import {
  RiLockPasswordLine,
  RiLogoutCircleLine,
  RiMovie2Fill,
} from "react-icons/ri";
import { HiViewGridAdd } from "react-icons/hi";
import { FiSettings } from "react-icons/fi";
import Layout from "../components/layout/Layout";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutAction } from "../../redux/action/user.action";
import toast from "react-hot-toast";
import { MdMessage } from "react-icons/md";

const Sidebar = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((status) => status.userLogin);

  const adminId = "67d05180336597cf21989be6";

  // log out function
  const logoutHandler = () => {
    dispatch(logoutAction());
    navigate("/login");
    toast.success("Logged out successfully");
  };

  const SideLinks = userInfo?.isAdmin
    ? [
        {
          name: "Dashboard",
          link: "/dashboard",
          icon: BsFillGridFill,
        },
        {
          name: "Movies List",
          link: "/moviesList",
          icon: FaListAlt,
        },
        {
          name: "Add movie",
          link: "/addmovie",
          icon: RiMovie2Fill,
        },
        {
          name: "Categories",
          link: "/categories",
          icon: HiViewGridAdd,
        },
        {
          name: "Users",
          link: "/users",
          icon: FaUser,
        },
        {
          name: "Update Profile",
          link: "/profile",
          icon: FiSettings,
        },
        {
          name: "Favorites",
          link: "/favorites",
          icon: FaHeart,
        },
        {
          name: "Change Password",
          link: "/password",
          icon: RiLockPasswordLine,
        },
        {
          name: "Message",
          link: `/message/${adminId}`,
          icon: MdMessage,
        },
      ]
    : userInfo
    ? [
        {
          name: "Update Profile",
          link: "/profile",
          icon: FiSettings,
        },
        {
          name: "Favorites",
          link: "/favorites",
          icon: FaHeart,
        },
        {
          name: "Change Password",
          link: "/password",
          icon: RiLockPasswordLine,
        },
        {
          name: "Chat with Admin",
          link: `/message/${adminId}`,
          icon: MdMessage,
        },
      ]
    : [];

  const active = "bg-dryGray text-subMain";
  const hover = "hover:text-white hover:bg-main";
  const inActive =
    "rounded font-medium text-sm transition duration-500 ease-in-out flex gap-3 items-center p-4";

  return (
    <Layout>
      <div className="min-h-screen container mx-auto px-2">
        <div className="xl:grid grid-cols-8 gap-10 items-start md:py-12 py-6">
          <div className="col-span-2 sticky bg-dry border border-gray-800 p-6 rounded-md xl:mb-0 mb-5">
            {
              // sidebar links
              SideLinks.map((link, index) => (
                <NavLink
                  key={index}
                  to={link.link}
                  className={({ isActive }) =>
                    isActive ? `${active} ${inActive}` : `${inActive} ${hover}`
                  }
                >
                  <link.icon /> <p>{link.name}</p>
                </NavLink>
              ))
            }
            <button
              className={`${inActive} ${hover} w-full`}
              onClick={logoutHandler}
            >
              <RiLogoutCircleLine /> Log Out
            </button>
          </div>
          <div
            data-aos="fade-up"
            className="col-span-6 rounded-md bg-dry border border-gray-800 p-6 "
          >
            {children}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Sidebar;
