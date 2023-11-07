import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import routes from '@/routes';
import styles from '@/styles/Layout/Navbar.module.css';
import Button from '../Button';

function Navbar() {
  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const logout = useCallback(() => {
    document.cookie = 'token=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    setIsLoggedIn(false);
  }, []);

  useEffect(() => {
    const { token } = parseCookies(null);

    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <nav className={styles.container}>
      <Link
        className={styles.logo}
        href={routes.home()}
      >
        The Bradery
      </Link>

      <div className={styles.linksWrapper}>
        <ShoppingCartIcon
          className={styles.icon}
          onClick={() => router.push(routes.cart())}
        />

        <Link href={routes.register()}>S&apos;inscrire</Link>

        {isLoggedIn ? (
          <Button onClickAction={() => logout()}>Se déconnecter</Button>
        ) : (
          <Link href={routes.login()}>Se connecter</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
