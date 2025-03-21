/* eslint-disable react/prop-types */
import { createContext, useState, useContext } from "react";

// Tạo Context cho Sidebar
export const SidebarContext = createContext();

// SidebarProvider sẽ cung cấp trạng thái cho các component
export const SidebarProvider = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  return (
    <SidebarContext.Provider value={{ drawerOpen, toggleDrawer }}>
      {children}
    </SidebarContext.Provider>
  );
};

// Hook tùy chỉnh để sử dụng context trong các component
export const useSidebar = () => useContext(SidebarContext);
