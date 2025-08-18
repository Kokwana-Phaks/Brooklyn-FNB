import Fruit from "./Fruit";

export default function Fruits() {
  const fruits = [
    { name: "Apple", price: 10, emoji: "🍏" },
    { name: "Mango", price: 15, emoji: "🥭" },
    { name: "Orange", price: 20, emoji: "🍊" },
    { name: "Banana", price: 25, emoji: "🍌" },
    { name: "Pineapple", price: 30, emoji: "🍍" },
  ];
  return (
    <div>
      <ul>
        {fruits.map((fruit) => (
          //<li key={fruit.name}>
          //{fruit.emoji} {fruit.name} ${fruit.price}
          //</li>
          <Fruit
            key={fruit.name}
            name={fruit.name}
            price={fruit.price}
            emoji={fruit.emoji}
          />
        ))}
      </ul>
    </div>
  );
}
