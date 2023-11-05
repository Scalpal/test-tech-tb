import React from 'react';
import PropTypes from 'prop-types'; // ES6
import classNames from 'classnames';
import styles from '@/styles/Components/Button.module.css';

type Props = {
  children: any;
  onClickAction?: () => void;
  disabled?: boolean;
};

function Button(props: Props) {
  const { children, onClickAction, disabled } = props;
  return (
    <button
      className={classNames(
        styles.button,
        disabled && styles.disabled,
      )}
      type="submit"
      onClick={onClickAction}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  onClickAction: PropTypes.func,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  onClickAction: () => console.log('test'),
  disabled: false,
};

export default Button;
