import Zone from "./components/condition";
import ConditionalComponent from "./components/ConditionalComponent";
import Fruits from "./components/fruits";
import Hello from "./components/Hello";
import Tenary from "./components/Tenary";
import Message from "./components/Message";
import Counter from "./components/counter";
import Form from "./components/Form";

function App() {
  const person = {
    name: "Phaks",
    message: "Hi there!",
    emoji: "👨🏿‍💻",
    seatNumbers: [3, 6, 0],
  };
  return (
    <div className="App">
      <Hello person={person} />
      <Fruits />
      <ConditionalComponent />
      <Zone />
      <Tenary />
      <Message />
      <Counter />
      <Form />
    </div>
  );
}

export default App;
