import { ReactNode, CSSProperties } from 'react';
import styles from "./index.module.css";
import TwoColumns from '../TwoColumns';

interface IntroProps {
  children: [ReactNode, ReactNode];
  style?: CSSProperties; // Дополнительные стили, передаваемые как пропс
  className?: string; // Дополнительный класс, если нужно
}

export default function Intro({ children: [description, image], style, className }: IntroProps) {
  return (
    <section
      className={`${className} ${styles.IntroWrapper} ${styles.Intro}`}
      style={{ ...style }}
    >
      <TwoColumns className={styles.Intro__container}>
        <div className={styles.Intro__description}>{description}</div>
        <div className={styles.Intro__image}>{image}</div>
      </TwoColumns>
    </section>
  );
}
