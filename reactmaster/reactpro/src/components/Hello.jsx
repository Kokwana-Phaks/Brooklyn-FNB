function Hello({name, message, emoji}) {
    return (
        <div>
            <h1>
                {message} {emoji} {name} 
            </h1>
        </div>
    );
}

export default Hello;