import Fruits from "./components/Fruits";
import Hello from "./components/Hello";

function App() {

  const person = {
    name: "Phaks",
    message: "Hi there!",
    emoji: "👨🏿‍💻",
    seatNumbers: [3, 6, 0],
  }
  return (
    <div className="App">
      <Hello person={person} />
      <Fruits />
    </div>
  );
}

export default App;
