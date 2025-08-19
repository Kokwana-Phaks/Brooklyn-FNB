import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);
  const [increaseBy, setIncreaseBy] = useState(1);

  function Increase() {
    setCount(count + increaseBy);
  }

  function Decrease() {
    setCount(count - increaseBy);
  }

  function IncreaseBy() {
    setIncreaseBy(increaseBy + 1);
  }

  function DecreaseBy() {
    setIncreaseBy(increaseBy - 1);
  }

  return (
    <div>
      <h1>The Count is: {count}</h1>
      <button onClick={Increase}>increase</button>
      <button onClick={Decrease}>decrease</button>

      <h1>Increase count by{increaseBy}</h1>
      <button onClick={IncreaseBy}>increase counter by</button>
      <button onClick={DecreaseBy}>decrease counter by</button>
    </div>
  );
}
