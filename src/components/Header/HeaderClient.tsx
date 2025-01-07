'use client';

import LogoutButton from '@/components/LogoutButton';
import styles from './index.module.css';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useUser } from '@/context/UserContext';

export default function HeaderClient() {
  const { state } = useUser();
  const [ isMenuOpened, setIsMenuOpened] = useState<boolean>(false);
  const navRef = useRef<HTMLDivElement | null>(null);

  const handleOpenMenu = (): void => {
    setIsMenuOpened((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent): void => {
    if (navRef.current && !navRef.current.contains(event.target as Node)) {
      setIsMenuOpened(false);
    }
  };

  useEffect(() => {
    if (isMenuOpened) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpened]);

  return state.username && (
    <nav ref={navRef} className={styles.Nav}>
      <button
        onClick={handleOpenMenu}
        className={`${styles.NavOpener} ${isMenuOpened ? styles.IsOpened : ''}`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="20 20 60 60" width="30" height="30">
          <path className="line--1" d="M0 40h62c13 0 6 28-4 18L35 35"></path>
          <path className="line--2" d="M0 50h70"></path>
          <path className="line--3" d="M0 60h62c13 0 6-28-4-18L35 65"></path>
        </svg>
      </button>
      { isMenuOpened && (
        <ul className={styles.NavList}>
          {/* {state.username ? ( */}
            <>
              <li className={styles.NavItem}>
                Привет, 
                <Link
                  href={`/${state.username}`}
                >
                  {state.username}
                </Link>!
              </li>
              <li className={styles.NavItem}>
                <Link
                  href={`/${state.username}/settings`}
                >
                  Settings
                </Link>
              </li>
              <li className={styles.NavItem}>
                <Link
                  href={`/${state.username}/add-photo`}
                >
                  Add Photo
                </Link>
              </li>
              <li className={styles.NavItem}>
                <LogoutButton />
              </li>
            </>
          {/* ) : (
            <>
              <li className={styles.NavItem}>
                <Link
                  href={`/login`}
                >
                  Login
                </Link>
              </li>
              <li className={styles.NavItem}>
                <Link
                  href={`/register`}
                >
                  Signup
                </Link>
              </li>
            </>
          )} */}
        </ul>
      )}
    </nav>
  );
}
