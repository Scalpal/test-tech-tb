import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '@/styles/Pages/Cart.module.css';
import Button from '@/components/Button';
import routes from '@/routes';

function Cart() {
  const router = useRouter();
  const [cart, setCart] = useState<any>();

  const deleteFromCart = useCallback((itemId: number) => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const localStorageCartString = localStorage.getItem('cart') as string;
      const localStorageCart = JSON.parse(localStorageCartString);

      const updatedCart = localStorageCart.filter((item: any) => item.id !== itemId);
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
  }, []);

  const removeOneFromCart = useCallback((itemId: number) => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const localStorageCartString = localStorage.getItem('cart') as string;
      const localStorageCart = JSON.parse(localStorageCartString);

      const existingItemIndex = localStorageCart
        .findIndex((item: any) => item.id === itemId) as number;

      if (localStorageCart[existingItemIndex].quantity - 1 === 0) {
        deleteFromCart(itemId);
        return;
      }

      localStorageCart[existingItemIndex] = {
        ...localStorageCart[existingItemIndex],
        quantity: localStorageCart[existingItemIndex].quantity - 1,
      };

      setCart(localStorageCart);
      localStorage.setItem('cart', JSON.stringify(localStorageCart));
    }
  }, [deleteFromCart]);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const localStorageCartString = localStorage.getItem('cart') as string;

      if (localStorageCartString === null) {
        setCart([]);

        return;
      }

      const localStorageCart = JSON.parse(localStorageCartString);
      setCart(localStorageCart);
    }
  }, []);

  return (
    <main className={styles.main}>
      <h1 className={styles.mainTitle}>Panier</h1>

      <div className={styles.cartContainer}>
        {cart?.length > 0 ? (
          cart.map((item: any) => (
            <div
              key={item.id}
              className={styles.productCard}
            >
              <p>{item.name}</p>
              <p>{item.price}</p>
              <p>
                {item.quantity}
                {' '}
                {item.quantity > 1 ? 'pièces' : 'pièce'}
              </p>

              <Button onClickAction={() => removeOneFromCart(item.id)}>
                Retirer 1 du panier
              </Button>

              <Button onClickAction={() => deleteFromCart(item.id)}>
                Supprimer
              </Button>
            </div>
          ))
        ) : (
          <p>Votre panier est vide</p>
        )}
      </div>

      <Button onClickAction={() => router.push(routes.payment())}>
        Passer au paiement
      </Button>

    </main>
  );
}

export default Cart;