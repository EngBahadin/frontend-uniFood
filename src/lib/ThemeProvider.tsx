"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { SkeletonTheme } from "react-loading-skeleton";

export const ThemeContext = createContext({
  theme: "light",
  changeTheme: (newTheme: string) => {},
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState("light");
  const [loading, setLoading] = useState(true);

  // Helper function to determine system theme
  const getSystemTheme = () =>
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";

  // Helper function to update the document theme
  const updateDocumentTheme = (selectedTheme: string) => {
    const appliedTheme =
      selectedTheme === "system" ? getSystemTheme() : selectedTheme;

    if (appliedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
      updateDocumentTheme(savedTheme);
    } else {
      const systemTheme = getSystemTheme();
      setTheme("system"); // Store system as default instead of light/dark
      updateDocumentTheme(systemTheme);
    }
    setLoading(false);
  }, []);

  const changeTheme = (newTheme: string) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    updateDocumentTheme(newTheme);
  };

  if (loading) return null;

  const appliedTheme = theme === "system" ? getSystemTheme() : theme;
  const baseColor = appliedTheme === "dark" ? "#333" : "#e0e0e0";
  const highlightColor = appliedTheme === "dark" ? "#444" : "#d0d0d0";

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      <SkeletonTheme baseColor={baseColor} highlightColor={highlightColor}>
        {children}
      </SkeletonTheme>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
