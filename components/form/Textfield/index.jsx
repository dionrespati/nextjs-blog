import React from 'react';
import cn from 'classnames';
import {
  oneOfType, oneOf, string, bool, func,
} from 'prop-types';

const TextInput = (props) => {
  const {
    label,
    message,
    name,
    type,
    value,
    isError,
    onChange,
    onBlur,
    required,
    readOnly,
    className,
  } = props;

  return (
    <div className={cn('text-sm mb-2', { error: isError })}>
      <label
        htmlFor={name}
        className="block mb-1"
      >
        {label}
      </label>
      <input
        id={name}
        type={type}
        value={value}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        required={required}
        readOnly={readOnly}
        className={cn(
          'p-1 border border-solid',
          className,
          {
            'border-black': !readOnly,
            'bg-gray-200 border-gray-400 cursor-not-allowed focus:outline-none': readOnly,
          },
        )}
      />
      {message && <p>{message}</p>}
    </div>
  );
};

TextInput.defaultProps = {
  type: 'text',
  required: false,
  message: undefined,
  name: undefined,
  value: undefined,
  label: undefined,
  isError: undefined,
  readOnly: false,
  className: undefined,
  onChange: () => {},
  onBlur: () => {},
};

TextInput.propTypes = {
  type: oneOfType([
    oneOf(['text', 'date', 'password', 'email', 'number']),
  ]),
  message: string,
  name: string,
  value: string,
  label: string,
  isError: bool,
  onChange: func,
  onBlur: func,
  required: bool,
  readOnly: bool,
  className: string,
};

export default TextInput;
