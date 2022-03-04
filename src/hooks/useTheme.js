import React, { useState } from "react";

const useTheme = (initialTheme = "light") => {
  const [theme, setTheme] = useState(initialTheme);

  const validateTheme = (themeToCheck) => {
    if (themeToCheck === "dark") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };
  return { theme, setTheme: validateTheme };
};

export default useTheme;
