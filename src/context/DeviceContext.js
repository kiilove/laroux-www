import React, { createContext, useContext } from "react";
import { useMediaQuery } from "react-responsive";

const DeviceContext = createContext();

export const DeviceProvider = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
  const isDesktop = useMediaQuery({ minWidth: 1024 });

  return (
    <DeviceContext.Provider value={{ isMobile, isTablet, isDesktop }}>
      {children}
    </DeviceContext.Provider>
  );
};

export const useDevice = () => useContext(DeviceContext);
