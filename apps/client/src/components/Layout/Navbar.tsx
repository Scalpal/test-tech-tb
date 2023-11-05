import Link from 'next/link';
import React from 'react';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import routes from '@/routes';
import styles from '@/styles/Layout/Navbar.module.css';

function Navbar() {
  const router = useRouter();

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
        <Link href={routes.login()}>Login</Link>
      </div>
    </nav>
  );
}

export default Navbar;
