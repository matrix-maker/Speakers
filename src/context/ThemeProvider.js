import React, { createContext } from "react";
import useTheme from "../hooks/useTheme";

export const ThemeContext = createContext();

const ThemeProvider = ({ initialTheme, children }) => {
  const { theme, setTheme } = useTheme(initialTheme);
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div>{children}</div>
    </ThemeContext.Provider>
  );
};

export { ThemeProvider };
