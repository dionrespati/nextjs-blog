import Axios from 'axios';
import { baseUrlApi, setJsonResponse } from "../../../custom/contoh";

const getStockist = async(param) => {
  return await Axios({
    url: `${baseUrlApi}/api/v2/getStockist`,
    method: 'POST',
    data: param
  }).then((res) => {
    const {status, data} = res;
    //console.log({status, data});
    if(status === 200) {
      return setJsonResponse(data);
    } 
  }).catch(function (error) {
    console.log(`masuk catch error`, error);
  });
}

export default getStockist;