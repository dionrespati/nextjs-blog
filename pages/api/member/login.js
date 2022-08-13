import Axios from "axios";
import { baseUrlApi, setJsonResponse } from "../../../custom/contoh";

async function loginAuth(idmember, password) {
  return await Axios({
    url: `${baseUrlApi}/api/v2/login`,
    method: 'POST',
    data: {
      idmember: idmember,
      password: password,
    }
  }).then((res) => {
    const {status, data} = res;
    if(status === 200) {
      return setJsonResponse(data);
    } 
  }).catch(function (error) {
    console.log(`masuk catch error`, error);
  });
}

const logout = () => {
  localStorage.removeItem('login');
}

export {loginAuth, logout};