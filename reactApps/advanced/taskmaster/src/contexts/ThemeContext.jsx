import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export function ThemeProvider({chiddren}) {
    const [isDark, setIsDark] = useState (() => {
        const saved = localStorage.getItem('theme');
        const preferDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        return saved ? JSON.parse(saved) : preferDark;
    });

    useEffect(() => {
        localStorage.setItem('theme', JSON.stringify(isDark));
        document.body.className = isDark ? 'dark' : 'light';
    }, [isDark]);

    const toggletTheme = () => setIsDark(!isDark);

    return (
        <ThemeContext.Provider value={{isDark, toggletTheme}}>
            {chiddren}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error ('useTheme must be used within ThemeProvider');
    }
    return context;
}

