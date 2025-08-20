export default function Message() {
  function handleClick() {
    alert("Full Stack Developer");
  }

  return (
    <div>
      <button onClick={handleClick}>Get top 5 devs</button>
    </div>
  );
}
