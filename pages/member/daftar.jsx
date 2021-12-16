import React, { useState } from 'react';
import TextInput from '../../components/form/Textfield';

const daftar = () => {
  const [formData, setFormData] = useState({});

  const handleForm = (event) => {
    const { value, name } = event.target;
    const newValue = {
      ...formData,
      [name]: value,
    };
    setFormData(newValue);
  }

  const {firstname, lastname, username, password} = formData;

  return (   
    <>
      <div class="bg-white dark:bg-gray-800">
        <TextInput 
          label="First Name"
          type="text" 
          name="firstname" 
          value={firstname} 
          onChange={handleForm}
        />
        <TextInput 
          label="Last Name"
          type="text" 
          name="lastname" 
          value={lastname} 
          onChange={handleForm}
        />
        <TextInput 
          label="User Name"
          type="text" 
          name="username" 
          value={username} 
          onChange={handleForm}
        />
        <TextInput 
          label="Password"
          type="password" 
          name="password" 
          value={password} 
          onChange={handleForm}
        />
      </div>
    </>
  )
}

export default daftar;
