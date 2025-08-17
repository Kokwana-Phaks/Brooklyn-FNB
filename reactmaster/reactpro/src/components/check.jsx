function Check() {
  const fruits = [
    { name: "Apple", price: 10, emoji: "🍏" },
    { name: "Banana", price: 15, emoji: "🍌" },
    { name: "Mango", price: 20, emoji: "🥭" },
    { name: "Orange", price: 25, emoji: "🍊" },
    { name: "Pineaple", price: 30, emoji: "🍍" },
  ];

  return (
    <div>
      <ul>
        {fruits.map((fruitz) => (
          <li key={fruitz.name}>
            {fruitz.name}
            ${fruitz.price}
            {fruitz.emoji}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Check;
