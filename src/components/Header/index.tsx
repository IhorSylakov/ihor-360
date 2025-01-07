import Breadcrumbs from '../Breadcrumbs';
import HeaderClient from './HeaderClient';
import styles from './index.module.css';

export default function Header() {

  return (
    <header className={styles.Header}>
      <Breadcrumbs />
      <HeaderClient />
    </header>
  );
}
