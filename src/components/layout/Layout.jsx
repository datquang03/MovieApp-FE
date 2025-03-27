import Footer from "./footer/Footer";
import MobileFooter from "./footer/MobileFooter";
import Navbar from "./navbar/Navbar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// eslint-disable-next-line react/prop-types
const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    const storedUserInfo = localStorage.getItem("userInfo");
    if (storedUserInfo && !userInfo) {
      const userData = JSON.parse(storedUserInfo);
      // Khôi phục trạng thái đăng nhập bằng cách dispatch USER_LOGIN_SUCCESS
      dispatch({
        type: "USER_LOGIN_SUCCESS",
        payload: userData,
      });
    }
  }, [dispatch, userInfo]);

  return (
    <div className="bg-main text-white">
      <Navbar />
      {children}
      <Footer />
      <MobileFooter />
    </div>
  );
};

export default Layout;
