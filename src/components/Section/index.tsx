import { ReactNode, CSSProperties } from 'react';
import styles from "./index.module.css";

interface SectionProps {
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
}

export default function Section({ children, className }: SectionProps) {
  return (
    <section className={`${className} ${styles.Section}`}>
      <div className={styles.Container}>
        {children}
      </div>
    </section>
  );
}
