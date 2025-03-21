/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import bg from "/assets/mainbg.png";
import { BsCollectionFill } from "react-icons/bs";
import { HiOutlineUserGroup } from "react-icons/hi";
import { BiPhoneCall } from "react-icons/bi";
import { MdDashboard } from "react-icons/md";
import {
  FaDiscord,
  FaFacebook,
  FaHouseUser,
  FaMailBulk,
  FaTelegram,
  FaUser,
} from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
const MenuDrawer = ({ drawerOpen, toggleDrawer }) => {
  const Links = [
    {
      name: "Home",
      link: "/",
      icon: FaHouseUser,
    },
    {
      name: "Movies",
      link: "/movies",
      icon: BsCollectionFill,
    },
    {
      name: "About us",
      link: "/about",
      icon: HiOutlineUserGroup,
    },
    {
      name: "Contact us",
      link: "/contact",
      icon: BiPhoneCall,
    },
    {
      name: "Dashboard",
      link: "/dashboard",
      icon: MdDashboard,
    },
    {
      name: "Profile",
      link: "/profile",
      icon: FaUser,
    },
    {
      name: "Message",
      link: "/message",
      icon: FaMessage,
    },
  ];
  const LinksData = [
    {
      icon: FaFacebook,
      link: "https://www.facebook.com/",
    },
    {
      icon: FaTelegram,
      link: "https://t.me/",
    },
    {
      icon: FaDiscord,
      link: "https://discord.com/",
    },
    {
      icon: FaMailBulk,
      link: "https://mail.google.com/",
    },
  ];
  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 transition-all ${
        drawerOpen ? "block" : "hidden"
      }`}
    >
      <div className="absolute top-0 right-0 w-4/5 md:w-1/2 h-full shadow-lg z-50 transition-transform transform bg-dry">
        <div className="flex justify-between items-center p-4 bg-dry">
          <Link to="/" onClick={toggleDrawer}>
            <img src={bg} alt="logo" className="w-28 h-28 object-contain" />
          </Link>
          <button
            onClick={toggleDrawer}
            className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full text-gray-800 hover:bg-subMain hover:text-white transition duration-500 ease-in-out"
            type="button"
          >
            <IoClose size={24} />
          </button>
        </div>

        <div className="flex flex-col items-center bg-dry rounded-md w-full overscroll-y-scroll max-h-full">
          {/* Menu Links */}

          {Links.map((link, index) => (
            <Link
              to={link.link}
              key={index}
              onClick={toggleDrawer}
              className="flex items-start w-full py-4 px-6 rounded-md text-white font-bold text-xl gap-8 hover:bg-gray-100 hover:text-subMain transition duration-500 ease-in-out "
            >
              <link.icon size={24} className=" size-6" />
              {link.name}
            </Link>
          ))}
        </div>
        <div className=" my-10 border-2 border-dashed"></div>
        <div className="flex justify-center items-center flex-grow gap-6 w-full">
          {LinksData.map((link, index) => (
            <a
              target="blank"
              rel="noreferrer"
              href={link.link}
              key={index}
              className="flex flex-col items-center justify-center w-12 h-12 transition duration-500 ease-in-out hover:bg-subMain text-lg bg-white rounded bg-opacity-30"
            >
              <link.icon size={24} className=" size-6" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuDrawer;
