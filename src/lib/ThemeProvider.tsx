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
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState("light");
  const [loading, setLoading] = useState(true);

  // Helper function to update the document theme
  const updateDocumentTheme = (theme: string) => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
      updateDocumentTheme(savedTheme);
    } else {
      const prefersDarkMode = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      const systemTheme = prefersDarkMode ? "dark" : "light";
      setTheme(systemTheme);
      updateDocumentTheme(systemTheme);
    }
    setLoading(false);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    updateDocumentTheme(newTheme);
  };

  if (loading) return null;

  const baseColor = theme === "dark" ? "#333" : "#e0e0e0";
  const highlightColor = theme === "dark" ? "#444" : "#d0d0d0";

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <SkeletonTheme baseColor={baseColor} highlightColor={highlightColor}>
        {children}
      </SkeletonTheme>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
