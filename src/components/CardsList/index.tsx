import { CSSProperties, FC } from 'react';
import styles from "./index.module.css";

interface ListProps<T> {
  list: T[],
  type: string,
  ItemComponent: FC<{ item: T }>;
  style?: CSSProperties;
  className?: string;
}

export default function List<T>({ list, ItemComponent, type, style }: ListProps<T>) {
  return (
    <ul
      className={type === "grid" ? styles.ListGrid : styles.ListFlex}
      style={{ ...style }}
    >
      {list.map((item, index) => (
        <li
          key={index}
          className={styles.Item}
        >
          <ItemComponent item={item} />
        </li>
      ))}
    </ul>
  );
}
