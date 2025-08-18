import Fruit from "./Fruit";

export default function Fruits() {
  const fruits = [
    { name: "Apple", price: 10, emoji: "🍏", soldout: false },
    { name: "Mango", price: 15, emoji: "🥭", soldout: true },
    { name: "Orange", price: 20, emoji: "🍊", soldout: false },
    { name: "Banana", price: 25, emoji: "🍌", soldout: false },
    { name: "Pineapple", price: 30, emoji: "🍍", soldout: true },
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
            soldout={fruit.soldout}
          />
        ))}
      </ul>
    </div>
  );
}
