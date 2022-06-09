import React from 'react';

const minMaxInputMessage = (props) => {
  const {value, setLength} = props;

  let minLength = 0;
  let maxLength = 0;
  if(setLength !== undefined) {
    const arrLength = setLength.split("-");
    minLength = arrLength[0];
    maxLength = arrLength[1];
  }

  const checkminLength = value.length >= minLength ? true : false;
  const checkMaxLength = value.length <= maxLength ? true : false;
  const checkMinMaxLength = checkminLength && checkMaxLength;

  return (
    <p className={checkMinMaxLength ? 'text-sm font-normal text-green-700' : 'text-sm font-normal text-red-600'}>* Minimal Karakter adalah {minLength} - {maxLength}</p>
  );
}

export default minMaxInputMessage;