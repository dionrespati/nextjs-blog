import React from 'react'

const emailMessage = (props) => {
  const {value} = props;

  const isValidEmail = value && value.length > 0 && /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(value).toLowerCase());

  return (
    <p className={isValidEmail ? 'text-sm font-normal text-green-700' : 'text-sm font-normal text-red-600'}>Format Email harus mengandung "@" dan ""."</p>
  )
}

export default emailMessage;