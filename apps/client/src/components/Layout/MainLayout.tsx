import React from 'react';
import styles from '@/styles/Layout/MainLayout.module.css';
import Navbar from './Navbar';

type Props = {
  children: any;
};

function MainLayout(props: Props) {
  const { children } = props;
  return (
    <div className={styles.container}>
      <Navbar />
      {children}
    </div>
  );
}

export default MainLayout;
