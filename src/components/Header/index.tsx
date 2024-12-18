import Link from 'next/link';
import Breadcrumbs from '../Breadcrumbs';
import styles from './index.module.css'

export default function Header() {
  return (
    <header className={styles.Header}>
      <Breadcrumbs />

      <Link
        href={`/settings`}
      >
        Settings
      </Link>
    </header>
  );
}
