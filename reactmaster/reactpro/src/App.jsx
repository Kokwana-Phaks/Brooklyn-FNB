import Zone from "./components/condition";
import ConditionalComponent from "./components/ConditionalComponent";
import Fruits from "./components/Fruits";
import Hello from "./components/Hello";
import Tenary from "./components/Tenary";

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
      <ConditionalComponent />
      <Zone />
      <Tenary />
    </div>
  );
}

export default App;
