import { Field } from 'formik';
import React from 'react';
import styles from '@/styles/Components/Field.module.css';

type Props = {
  type: string;
  value: string | number;
  name: string;
  label?: string;
  placeholder: string;
  showErrors?: boolean;
};

const defaultProps = {
  label: '',
  showErrors: false,
};

function FormikField(props: Props) {
  const {
    type, value, name, label, placeholder, showErrors, ...otherProps
  } = props;

  return (
    <Field name={name}>
      {({ field, meta }: any) => (
        <div className={styles.wrapper}>
          {showErrors && meta.touched && meta.error ? (
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
