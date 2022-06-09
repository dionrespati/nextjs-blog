import React, { createContext, useContext, useState, useEffect } from 'react';


const AppContext = createContext();
const validLogin = null;

export const AppWrapper = ({children}) => {

  const [login, setLogin] = useState(validLogin);
  const [menu, setMenu] = useState([]);
  /* useEffect(() => {
  }, []); */

  useEffect(() => {    
    const hasil = null;
    fetch('http://localhost:3000/api/menu')
     .then(response => response.json())
     .then(responsedata => {
      console.log('use effect navbar kepanggil');
       const {data, errorCode } = responsedata;
       console.log({responsedata});
       if(errorCode === "0") {
        setMenu(data);
       }
     });
    
  },[]);

  return (
    <AppContext.Provider
      value={{
        login,
        setLogin,
        menu,
        setMenu
      }}
    >
      {children}
    </AppContext.Provider>
  );

}

export const useAppContext = () => useContext(AppContext);  
