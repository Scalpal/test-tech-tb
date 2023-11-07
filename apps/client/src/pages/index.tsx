import Head from 'next/head';
import React, { useCallback, useEffect, useState } from 'react';
import styles from '@/styles/pages/Home.module.css';
import { Product } from '@/types/Product/Product';
import Button from '@/components/Button';
import useGetProducts from '@/hooks/useGetProducts';

function Home() {
  const [cart, setCart] = useState<any>();
  const [searchValue, setSearchValue] = useState<string>('');

  const { productsData, productsIsLoading } = useGetProducts(searchValue);
  const products = !productsIsLoading ? productsData : [];

  const addToCart = useCallback((item: any) => {
    if (item.stock === 0) return;

    if (typeof window !== 'undefined' && window.localStorage) {
      const localStorageCartString = localStorage.getItem('cart') as string;

      // If empty cart, create an array
      if (localStorageCartString === null) {
        const newItem = {
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: 1,
        };
        const newCart = [newItem];

        setCart(newCart);
        localStorage.setItem('cart', JSON.stringify(newCart));

        return;
      }

      // If not empty
      const localStorageCart = JSON.parse(localStorageCartString);

      // Check if item already in cart
      const existingItemIndex = localStorageCart
        .findIndex((product: Product) => product.id === item.id);

      if (existingItemIndex !== -1) {
        const updatedCart = [...localStorageCart];
        const currentItem = { ...updatedCart[existingItemIndex] };

        // If there's already all the stock of the item in cart, you can't add more of it
        if (item.stock === currentItem.quantity) return;

        updatedCart[existingItemIndex] = {
          ...currentItem,
          quantity: currentItem.quantity + 1,
        };

        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));

        return;
      }

      const newItem = {
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: 1,
      };

      const updatedCart = [...localStorageCart, newItem];
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
  }, []);

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

  useEffect(() => {
    const input = document.querySelector('#searchProductInput') as HTMLInputElement;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        setSearchValue(input?.value);
      }
    };

    input.addEventListener('keydown', handleKeyDown);

    return () => {
      input.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <main className={styles.main}>
      <Head>
        <title>The Bradery - Produits </title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className={styles.mainTitle}>Nos produits</h1>

      <input
        type="text"
        id="searchProductInput"
        className={styles.searchInput}
        placeholder="Rechercher un produit"
      />

      <div className={styles.productContainer}>
        {products.length > 0 ? (products.map((product: Product) => (
          <div
            key={product.id}
            className={styles.productCard}
          >
            {cart?.findIndex((item: any) => item.id === product.id) !== -1 && (
              <span className={styles.productInCartLabel}>
                {cart && cart[cart.findIndex((item: any) => item.id === product.id)].quantity}
                {' '}
                dans le panier
              </span>
            )}

            <p>{product.name}</p>
            <p>
              {product.price}
              €
            </p>
            <p>
              {product.stock}
              {' '}
              pièces restantes
            </p>

            {/* Disabled if product is out of stock OR already all items are taken in cart */}
            <Button
              onClickAction={() => addToCart(product)}
              disabled={
                product.stock <= 0
                || (cart?.length > 0
                && (cart[cart.findIndex((item: any) => item.id === product.id)]?.quantity
                  >= product.stock))
              }
            >
              Ajouter au panier
            </Button>
          </div>
        ))) : (
          <p className={styles.noResultsText}>
            {searchValue.length > 0
              ? `Aucun produit ne correspond à la recherche : ${searchValue}`
              : 'Aucun produit en vente actuellement'}
          </p>
        )}
      </div>
    </main>
  );
}

export default Home;
