import styles from "./item.modules.css";

export default function Item({ item }) {
  return (
    <div>
      <div className={styles.itemContaner}>
        <div className={styles.imageContainer}>
          <img
            className={styles.imageq}
            src={
              `https://spoonacular.com/cdn/ingredients_100x100/` + item.image
            }
            alt=""
          />
        </div>
        <div className={styles.nameContainer}>
          <div className={styles.name}>{item.name}</div>

          <div className={styles.amount}>
            {item.amount}
            {item.unit}
          </div>
        </div>
      </div>
    </div>
  );
}
