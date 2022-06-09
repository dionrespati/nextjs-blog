import React, { useState } from 'react';
import TextField from '../components/form/Textfield';

/* const inputs = [
  {
    label: "Username",
    name: "username",
    //errorMessage: "Karakter terdiri dari 3 - 16 dan tidak boleh mengandung karakter spesial",
    required: true,
    minLength: 8,
    maxLength: 12
  },
  {
    label: "Password",
    name: "password",
    //errorMessage: "Password minimal terdiri dari 8 - 16 karakter, harus mengandung minimal 1 Huruf Kapital, Huruf Kecil dan Angka",
    required: true,
    pattern:""
  },
   {
    label: "Nama Lengkap",
    name: "namaLengkap",
    errorMessage: "Hanya Huruf, maksimal 30 karakter",
    required: true,
    pattern: "[A-Za-z]{30}"
  },
  {
    label: "No KTP",
    type: "number",
    name: "noKtp",
    errorMessage: "Hanya angka, terdiri dari 12-14 digit",
    required: true,
    pattern: {}
  } 
]; */

const todo = () => {

  const initialValue = { username: "",  password: "", noKtp: "", namaLengkap: ""};
  const [formData, setFormData] = useState(initialValue);

  const handleForm = (e) => {
    const { value, name } = e.target;
    const newValue = {
      ...formData,
      [name]: value,
    };
    setFormData(newValue);
    //console.log({formData});
  }

  const { username } = formData;

  return (
    <>
      {/* {inputs && inputs.map((dataInput) => {
        const {label, name, pattern, errorMessage, required, } = dataInput;
        return ( */}
          <TextField 
            label="Username"
            name="username"
            pattern=""
            message=""
            required={true}
            onChange={handleForm}
            value={username}
            setLength="8-12"
          />
        {/* );
      })} */}
      
    </>
  );
}


export default todo;