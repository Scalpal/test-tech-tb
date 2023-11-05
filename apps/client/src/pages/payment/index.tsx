import { Form, Formik } from 'formik';
import Head from 'next/head';
import React, { useCallback, useState } from 'react';
import * as yup from 'yup';
import valid from 'card-validator';
import Axios from 'axios';
import FormikField from '@/components/FormikField';
import styles from '@/styles/pages/Payment.module.css';
import routes from '@/routes';
import Button from '@/components/Button';

type InitialValues = {
  mail: string,
  cardNumber: string,
  cardValidity: string,
  cardCryptogram: string,
  cardHolder: string,
};

const initialValues = {
  mail: '',
  cardNumber: '',
  cardValidity: '',
  cardCryptogram: '',
  cardHolder: '',
} as InitialValues;

const validationSchema = yup.object().shape({
  mail: yup.string().email('Veuillez rentrer une adresse e-mail valide'),
  cardNumber: yup.string().test({
    name: 'test-credit-card-number',
    message: 'Veuillez rentrer un numéro de carte de crédit valide.',
    test: (value) => {
      const cardInfo = valid.number(value);
      return cardInfo.isValid;
    },
  }).required('Veuillez rentrer un numéro de carte de crédit'),
  cardValidity: yup.string().test({
    name: 'test-credit-card-expirationDate',
    message: 'Veuillez rentrer une date d"expiration valide.',
    test: (value) => (valid.expirationDate(value).isValid),
  }).required('Veuillez rentrer une date d"expiration.'),
  cardCryptogram: yup.string().test({
    name: 'test-credit-card-cvv',
    message: 'Veuillez rentrer un cryptogramme valide.',
    test: (value) => (valid.cvv(value).isValid),
  }).required('Veuillez rentrer un cryptogramme.'),
  cardHolder: yup.string().min(3).required('Veuillez rentrer le nom du détenteur de la carte'),
});

function Payment() {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleSubmit = useCallback(async (values: InitialValues) => {
    setIsSubmitted(true);
    console.log('Datas sent : ', values);

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
    };

    try {
      const response = await Axios.post(`http://localhost:3001${routes.api.pay()}`, values, config);

      console.log('response : ', response);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <main className={styles.main}>
      <Head>
        <title>The Bradery - Paiement</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className={styles.mainTitle}>Paiement</h1>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnBlur={false}
        onSubmit={(values: InitialValues) => handleSubmit(values)}
      >
        {({
          values, isValid, dirty, errors,
        }) => (
          <Form className={styles.form}>

            <div className={styles.errorsContainer}>
              {(errors && isSubmitted) && Object.entries(errors).map(([key, value]: any) => (
                <p key={key}>{value}</p>
              ))}
            </div>

            <FormikField
              type="text"
              name="mail"
              value={values.mail}
              label="Adresse e-mail"
              placeholder="Adresse e-mail"
            />

            <p>Informations de la carte</p>

            <div className={styles.cardInformationsWrapper}>
              <FormikField
                type="text"
                name="cardNumber"
                value={values.cardNumber}
                placeholder="Numéro de la carte"
              />

              <FormikField
                type="text"
                name="cardValidity"
                value={values.cardValidity}
                placeholder="MM/YY"
              />

              <FormikField
                type="text"
                name="cardCryptogram"
                value={values.cardCryptogram}
                placeholder="CVC"
              />
            </div>

            <FormikField
              type="text"
              name="cardHolder"
              value={values.cardHolder}
              label="Nom du porteur"
              placeholder="Nom du porteur"
            />

            <Button
              disabled={!(dirty && isValid)}
            >
              Payer
            </Button>
          </Form>

        )}
      </Formik>
    </main>
  );
}

export default Payment;
