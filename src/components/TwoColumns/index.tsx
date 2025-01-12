import { ReactNode, CSSProperties } from 'react';
import styles from "./index.module.css";

interface TwoColumnsProps {
  children: [ReactNode, ReactNode];
  revert?: boolean;
  style?: CSSProperties;
  className?: string;
}

export default function TwoColumns({ children: [leftChild, rightChild], style, className, revert }: TwoColumnsProps) {
  return (
    <div className={`${className} ${styles.TwoColumns} ${revert && styles.Revert}`} style={{ ...style }}>
      <div className={styles.Column}>{leftChild}</div>
      <div className={styles.Column}>{rightChild}</div>
    </div>
  );
}
