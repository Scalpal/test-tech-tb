import { Form, Formik } from 'formik';
import React, { useCallback } from 'react';
import * as yup from 'yup';
import { setCookie } from 'nookies';
import { useRouter } from 'next/router';
import FormikField from '@/components/FormikField';
import Button from '@/components/Button';
import styles from '@/styles/Pages/Login.module.css';
import login from '@/services/login';
import routes from '@/routes';

type InitialValues = {
  email: string;
  password: string;
};

const initialValues: InitialValues = {
  email: '',
  password: '',
};

const validationSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

function Login() {
  const router = useRouter();

  const handleSubmit = useCallback(async (values: InitialValues) => {
    const [error, data] = await login(values);

    if (error === null) {
      setCookie(null, 'token', data.result, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      });

      router.push(routes.home());
    }
  }, [router]);

  return (
    <main className={styles.main}>
      <p className={styles.mainTitle}>Se connecter</p>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnBlur={false}
        onSubmit={(values: InitialValues) => handleSubmit(values)}
      >
        {({ values }) => (
          <Form className={styles.form}>
            <FormikField
              type="text"
              name="email"
              value={values.email}
              label="Adresse e-mail"
              placeholder="Adresse e-mail"
            />

            <FormikField
              type="password"
              name="password"
              value={values.password}
              label="Mot de passe"
              placeholder="Mot de passe"
            />

            <Button>
              Se connecter
            </Button>
          </Form>
        )}
      </Formik>
    </main>
  );
}

export default Login;
