import { createContext } from "react";

const RTLContext = createContext();

const RTLProvider = ({ children, isRTL }) => {
  return (
    <RTLContext.Provider value={{ isRTL }}>{children}</RTLContext.Provider>
  );
};

export { RTLProvider, RTLContext };
