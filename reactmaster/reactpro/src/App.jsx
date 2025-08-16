import Hello from "./components/Hello";

function App() {
  return (
    <div className="App">
      <Hello />
      <Hello name="Phaks" message="You are now a SE!" emoji="👨🏿‍💻"/>
      <Hello name="BackEnd" message="You are the best Engineer in town" emoji="⎔"/>
    </div>
  );
}

export default App;
