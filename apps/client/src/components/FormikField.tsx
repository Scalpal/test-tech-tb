import { Field } from 'formik';
import React from 'react';
import styles from '@/styles/Field.module.css';

type Props = {
  type: string;
  value: string | number;
  name: string;
  label?: string;
  placeholder: string;
};

const defaultProps = {
  label: '',
};

function FormikField(props: Props) {
  const {
    type, value, name, label, placeholder, ...otherProps
  } = props;

  return (
    <Field name={name}>
      {({ field, meta }: any) => (
        <div className={styles.wrapper}>
          {meta.touched && meta.error ? (
            <p className={styles.error}>{meta.error}</p>
          ) : (
            null
          )}

          {label && label.length > 0 && (
            <label
              htmlFor={name}
              className={styles.label}
            >
              {label}
            </label>
          )}

          <input
            {...field}
            className={styles.input}
            type={type}
            value={value}
            placeholder={placeholder}
            {...otherProps}
          />
        </div>
      )}
    </Field>
  );
}

FormikField.defaultProps = defaultProps;

export default FormikField;
