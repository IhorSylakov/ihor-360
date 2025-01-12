import { CSSProperties, ElementType } from 'react';
import Image from 'next/image';
import styles from "./index.module.css";
import { listItem } from '@/types/types';

interface CardProps {
  item: listItem;
  style?: CSSProperties;
  className?: string;
  link?: string;
  as?: ElementType;
}

export default function Card({ as: Tag = 'div', item, className, link }: CardProps) {
  return (
    <Tag
      className={`${className} ${styles.Card}`}
      href={link}
    >
      <div className={styles.Content}>
        {item.image && (
          <span
            className={styles.Image}
          >
            <Image
              width={270}
              height={245}
              alt="Healthcare Journey Mapping"
              src={item.image}
              style={{ margin: "0 auto" }}
            />
          </span>
        )}
        {item.icon && (
          <span
            className={styles.Icon}
            // style={{ background: `var(--color-secondary-${item.color})` }}
          >
            {/* <Icon
              name={item.icon}
              width="40px"
              height="40px"
            /> */}
            icon
          </span>
        )}
        <div className={styles.Title}>
          {item.title}
        </div>
        <div className={styles.Text}>
          {item.text}
        </div>
      </div>
    </Tag>
  );
}
