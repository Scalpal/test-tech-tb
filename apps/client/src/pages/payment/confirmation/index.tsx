import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Button from '@/components/Button';
import routes from '@/routes';
import Loader from '@/components/Loader';
import styles from '@/styles/Pages/ConfirmationPayment.module.css';

function ConfirmationOrder() {
  const router = useRouter();
  const [seconds, setSeconds] = useState<number>(15);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds((prevState) => prevState - 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    if (seconds === 0) {
      router.push(routes.home());
    }
  }, [seconds, router]);

  return (
    <main className={styles.main}>

      <p>Merci pour votre commande !</p>

      <p>
        Vous serez redirigez à l&apos;accueil dans
        {' '}
        {seconds}
        {' '}
        secondes
      </p>

      <Loader />

      <Button>
        Retourner à l&apos;accueil
      </Button>
    </main>
  );
}

export default ConfirmationOrder;
