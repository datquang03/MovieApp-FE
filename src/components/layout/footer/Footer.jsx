import { Link } from "react-router-dom";
import mainbg from "/assets/mainbg.png"
const Footer = () => {
  const Links = [
    {
      title: "Company",
      links: [
        {
          name: "Home",
          link: "/",
        },
        {
          name: "About",
          link: "/about",
        },
        {
          name: "Contact",
          link: "/contact",
        },
        {
          name: "Movies",
          link: "/movies",
        },
      ],
    },
    {
      title:"Top-Rated Categories",
      links: [
        {
          name: "Action",
          link: "#",
        },
        {
          name: "Adventure",
          link: "#",
        },
        {
          name: "Comedy",
          link: "#",
        },
        {
          name: "Drama",
          link: "#",
        },
      ],
    },
    {
      title:"My-account",
      links: [
        {
          name: "Dashboard",
          link: "/dashboard"
        },
        {
          name: "Favorites",
          link: "/favorites",
        },
        {
          name: "Profile",
          link: "/profile",
        },
        {
          name: "Change password",
          link: "/password",
        },
      ],
    }
  ]
  return (
    <div className="bg-dry py-4 border-t-2 border-black">
      <div className="container mx-auto px-2 ">
        <div className="grid grid-cols-2 md:grid-cols-7 xl:grid-cols-12 gap-5 sm:gap-9 lg:gap-11 justify-between">
          {Links.map((link, index) => (
            <div key={index} className="col-span-1 md:col-span-2 lg:col-span-3 pb-3.5 sm:pb-0">
              <h3 className="text-md lg:leading-7 font-medium mb-4 sm:mb-5 lg:mb-6 pb-0.5">{link.title}</h3>
              <ul className="text-sm flex flex-col space-y-3">
                {link.links.map((text, index) => (
                  <li key={index} className="flex items-baseline">
                    <Link to={text.link}className="text-border inline-block w-full hover:text-subMain cursor-pointer transition duration-500 ease-in-out">{text.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="pb-3.5 sm:pb-0 col-span-1 md:col-span-2 lg:col-span-3">
            <Link to={"/"}><img src={mainbg} className="w-full h-15 cursor-pointer object-contain"/></Link>
            <p className="leading-7 text-xm text-border mt-3">
              <span>&copy; 2025 Movie App. All rights reserved</span>
              <br />
              <span>. Made by <span className="text-subMain">Team 04</span></span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
