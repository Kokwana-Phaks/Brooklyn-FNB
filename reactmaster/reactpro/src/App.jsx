import Fruits from "./components/fruits";
import Hello from "./components/Hello";
import Prices from "./components/Prices";

function App() {

  const person = {
    name: "Phaks",
    message: "Hi there!",
    emoji: "👨🏿‍💻",
    seatNumbers: [1, 4, 7],
  }
  return (
    <div className="App">
      <Hello person={person} />
      <Fruits />
      <Prices />
    </div>
  );
}

export default App;
