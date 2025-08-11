import MovieCard from "../components/movieCard";

function Home() {
    const movies = [
        {id: 1, title: "John Wick", release_date: "2020"},
        {id: 2, title: "Terminator", release_date: "1999"},
        {id: 3, title: "The Matrix", release_date: "1998"},
    ];

    const handleSearch = () => {};

    return (
        <div className="home"> 
            <form onSubmit={handleSearch} className="search-form">
                <input
                     type="text"
                     placeholder="Search for Movies..." 
                     className="search-input"
                     />
                     <button type="submit" className="search">Search</button>
            </form>
            
            <div className="movies-grid">
                {movies.map((movie) => (
                    <MovieCard movie ={movie} key={movie.id} />
                ))}
            </div>
        </div>
    );
}

export default Home