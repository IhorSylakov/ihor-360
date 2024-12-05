import Breadcrumbs from '../Breadcrumbs';
import styles from './index.module.css'

export default function Header() {
  return (
    <header className={styles.Header}>
      <Breadcrumbs />
    </header>
  );
}
