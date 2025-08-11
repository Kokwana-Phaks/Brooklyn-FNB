import "./App.css";
import MovieCard from "./components/movieCard";
import Home from "./pages/Home"

function App() {

  const movieNumber = 1;
  
  return (
    <>
      {movieNumber === 1 ? (
        <MovieCard movie={{title: "Phaks's Film", release_date: "2025"}} />
      ) : (
        <MovieCard movie={{title: "Phaks's Film", release_date: "2025"}} />

      )}

      <Home />
    </>
  );
}

export default App;
