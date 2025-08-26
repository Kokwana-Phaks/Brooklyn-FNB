import styeles from "./footer.module.css";

export default function Footer({ completedTodos, totalTodos }) {
  return (
    <div className={styeles.footer}>
      <span className={styeles.item}>Completed Todos: {completedTodos}</span>
      <span className={styeles.item}> Total Todos: {totalTodos}</span>
    </div>
  );
}
