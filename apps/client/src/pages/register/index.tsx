import React, { useCallback } from 'react';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import * as yup from 'yup';
import styles from '@/styles/Pages/Login.module.css';
import FormikField from '@/components/FormikField';
import routes from '@/routes';
import register from '@/services/register';
import Button from '@/components/Button';

type InitialValues = {
  firstname: string,
  lastname: string,
  email: string;
  password: string;
};

const initialValues: InitialValues = {
  firstname: '',
  lastname: '',
  email: '',
  password: '',
};

const validationSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

function Register() {
  const router = useRouter();

  const handleSubmit = useCallback(async (values: InitialValues) => {
    const [error] = await register(values);

    if (error === null) {
      router.push(routes.login());
    }
  }, [router]);
  return (
    <main className={styles.main}>
      <p className={styles.mainTitle}>S&apos;inscrire</p>

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
              name="firstname"
              value={values.firstname}
              label="Prénom"
              placeholder="Prénom"
            />

            <FormikField
              type="text"
              name="lastname"
              value={values.lastname}
              label="Nom"
              placeholder="Nom"
            />

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
              S&apos;inscrire
            </Button>
          </Form>
        )}
      </Formik>
    </main>
  );
}

export default Register;
