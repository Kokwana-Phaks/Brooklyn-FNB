import "./App.css";
import MovieCard from "./components/movieCard";

function App() {

  const movieNumber = 2;
  
  return (
    <>
      {movieNumber === 1 ? (
        <MovieCard movie={{title: "Phaks's Film", release_date: "2025"}} />
      ) : (
        <MovieCard movie={{title: "jacks's Film", release_date: "2025"}} />

      )}
    </>
  );
}

export default App;
