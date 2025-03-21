import Footer from "./footer/Footer";
import MobileFooter from "./footer/MobileFooter";
import Navbar from "./navbar/Navbar";

// eslint-disable-next-line react/prop-types
const Layout = ({ children }) => {
  return (
    <div className="bg-main text-white">
      <Navbar />
      {children}
      <Footer />
      {/* Mobile footer */}
      <MobileFooter />
    </div>
  );
};

export default Layout;
