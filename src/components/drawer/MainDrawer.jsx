/* eslint-disable react/prop-types */
import Drawer from "rc-drawer";
import "rc-drawer/assets/index.css"; // Đảm bảo CSS được import

const MainDrawer = ({ children, drawerOpen, drawerClose }) => {
  return (
    <Drawer
      open={drawerOpen} // Sử dụng drawerOpen để mở hoặc đóng Drawer
      onClose={drawerClose} // Hàm đóng Drawer
      level={null}
      handler={false} // Ẩn nút handle mặc định
      placement="right"
      width="100%" // Điều chỉnh width nếu cần
      zIndex={9999} // Đảm bảo Drawer hiển thị trên cùng
    >
      {children}
    </Drawer>
  );
};

export default MainDrawer;
