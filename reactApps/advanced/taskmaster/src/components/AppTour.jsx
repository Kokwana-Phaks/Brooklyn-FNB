export default function AppTour({onClose}) {
    return (
        <div className="app-tour-overlay">
            <div className="app-tour-content">
                <h2>Welcome to TaskMaster!</h2>
                <ol className="tour-steps">
                    <li>Click "+" to add new tasks</li>
                    <li>Click the check to mark tasks complete</li>
                    <li>Click the pencil icon to edit tasks</li>
                    <li>Set the dates to priotize tasks</li>
                    <li>Usee the search bar to find spectifuc tasks</li>
                    <li>Toggle dark/light mode in the top right</li>
                </ol>
                <button
                    onClick={onclose}
                    className="tour-close-btn"
                >
                    Got it!
                </button>
            </div>
        </div>
    );
}