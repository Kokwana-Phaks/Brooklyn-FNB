import { useState } from "react";
import { useTheme } from "../contexts/ThemeContext";
import {FiSun, FiMoon} from "react-icons/fi";

export default function ThemeToggle() {
    const {isDark, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="theme-toggle"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
                {isDark ? <FiSun /> : <FiMoon />}
        </button>
    );
}