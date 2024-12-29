import { cookies } from 'next/headers';
import Breadcrumbs from '../Breadcrumbs';
import HeaderClient from './HeaderClient';
import styles from './index.module.css';

export default async function Header() {
  const userCookies = await cookies();
  const userCookie = userCookies.get('user');
  const user = userCookie ? JSON.parse(userCookie.value) : null;

  return (
    <header className={styles.Header}>
      <Breadcrumbs />
      <HeaderClient user={user} />
    </header>
  );
}
