import { use, useEffect, useState } from "react";
/// must be hidden
const URL = "https://api.spoonacular.com/recipes/complexSearch";
const API_KEY = "efb163470fb744cc9b32d6dc8c7dceca";

export default function Search({ foodData, setFoodData }) {
  const [query, setQuery] = useState("pizza");
  // syntax for the useEffect hook
  useEffect(() => {
    async function fetchFood() {
      const res = await fetch(`${URL}?query=${query}&apiKey=${API_KEY}`);
      const data = await res.json();
      setFoodData(data.results);
    }
    fetchFood();
  }, [query]);
  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
}
