import { useState, useEffect } from "react";
import { useTheme } from "./contexts/ThemeContext";
import { useKeyPress } from ".hooks/useKeyPress";
import TaskList from ".components/TaskList";
import ThemeToggle from ".components/ThemeToggle";
import AppTour from ".componetns/AppTour";
import Notification from "./components/AppTour";
import ".App.css";


export default function App() {
    const {isDark} = useTheme();
    const [showTour, setShowTour] = useState(
        !localStorage.getItem('hasShownTour')
    );
    const [notification, setNotification] = useState(null);
    const isHelpKeyPressed = useKeyPress ('?', true);

    const showNotification = (message, type = 'info') => {
        setNotification ({message, type});
        setTimeout(() => setNotification(null), 3000);
    };

    const completeTour = () => {
        setShowTour(false);
        localStorage.setItem('hasShownTour', 'true');
    };

    useEffect(() => {
        if(isHelpKeyPressed) setShowTour (true);
    }, [isHelpKeyPressed]);

    return (
        <div className={`app ${isDark ? 'dark' : 'light'}`}>
            <header className="app-header">
                <h1>TaskMaster</h1>
                <div className="header-controls">
                    <button
                        onClick={() => setShowTour(true)}
                        className="help-btn"
                        aria-label="Show tutorial"
                    >
                        ? Help
                    </button>
                    <ThemeToggle />
                </div>
            </header>
            <main className="app-main">
                <TaskList onNotification={showNotification} />
            </main>
            {showTour && <AppTour onClose={completeTour} />}
            {notification && <Notification {...notification} />}

            <footer className="app-footer">
                <p>@ {new Date().getFullYear()} TaskMaster - press Ctrl + ? for help</p>
            </footer>
        </div>
    );
}