import Head from 'next/head';
import React from 'react';
import styles from '@/styles/Home.module.css';

function Home() {
  return (
    <main className={styles.main}>
      <Head>
        <title>The Bradery - Products </title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

    </main>
  );
}

export default Home;
