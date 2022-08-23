import Axios from "axios";
import { baseUrlApi, setJsonResponse } from "../../../custom/contoh";

const getListAddress = async (idmember) => {
  return await Axios.get(`${baseUrlApi}/api/v2/getListAddressMember/${idmember}`)
    .then(res => {
      const {data, status} = res;
        if(status === 200) {
          return setJsonResponse(data);
        } 
    });
}

export default getListAddress