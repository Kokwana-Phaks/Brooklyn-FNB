export default function Notification({message, type = 'info'}) {
    return (
        <div className={`notification ${type}`}>
            {message}
        </div>
    );
}