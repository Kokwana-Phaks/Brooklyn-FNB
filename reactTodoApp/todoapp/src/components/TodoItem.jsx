import styles from "./todoitem.module.css";

export default function TodoItem({item}) {
    return (
        <div className={styles.item}>
            <div className={styles.itemName}>{item}
                <span className={styles.deleteButton}>x</span>
            </div>
            <hr className={styles.line}/>
        </div>
    );
}  