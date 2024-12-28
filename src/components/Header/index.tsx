'use client';

import Link from 'next/link';
import Breadcrumbs from '../Breadcrumbs';
import LogoutButton from '@/components/LogoutButton';
import styles from './index.module.css'
import { useUser } from '@/context/UserContext';

export default function Header() {
  const { state } = useUser();

  return (
    <header className={styles.Header}>
      <Breadcrumbs />

      <nav className={styles.Nav}>
        <input
          type="checkbox"
          id="menuOpener"
          className={styles.NavOpener}
        />
        <label
          htmlFor="menuOpener"
          className={styles.NavOpenerIcon}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="20 20 60 60" width="30" height="30">
            <path className="line--1" d="M0 40h62c13 0 6 28-4 18L35 35"></path>
            <path className="line--2" d="M0 50h70"></path>
            <path className="line--3" d="M0 60h62c13 0 6-28-4-18L35 65"></path>
          </svg>
        </label>
        <ul className={styles.NavList}>
          {!!state ? (
            <>
              <li className={styles.NavItem}>
                <Link
                  href={`/${state.username}`}
                >
                  {state.username}
                </Link>
              </li>
              <li className={styles.NavItem}>
                <Link
                  href={`/${state.username}/settings`}
                >
                  Settings
                </Link>
              </li>
            </>
          ) : (
            <li className={styles.NavItem}>
              <Link
                href={`/register`}
              >
                Signup
              </Link>
            </li>
          )}
          <li className={styles.NavItem}>
            <LogoutButton />
          </li>
        </ul>
      </nav>
    </header>
  );
}
