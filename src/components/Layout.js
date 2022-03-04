import React, { useContext } from "react";
import { ThemeContext, ThemeProvider } from "../context/ThemeProvider";

const Layout = ({ initialTheme, children }) => {
  return (
    <ThemeProvider initialTheme={initialTheme}>
      <LayoutWithoutTheme>{children}</LayoutWithoutTheme>
    </ThemeProvider>
  );
};

const LayoutWithoutTheme = ({ children }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <div
      className={
        theme === "light" ? "container-fluid light" : "container-fluid dark"
      }
    >
      {children}
    </div>
  );
};

export default Layout;
