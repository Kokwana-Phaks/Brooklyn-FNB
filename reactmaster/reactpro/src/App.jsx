import Hello from "./components/Hello";

function App() {
  return (
    <div className="App">
      <Hello />
      <Hello name="Phaks" message="You are now a SE!" />
      <Hello name="BackEnd" message="You are the best Engineer in town" />
    </div>
  );
}

export default App;
