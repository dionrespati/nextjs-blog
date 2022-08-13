import Axios from "axios";
import { baseUrlApi, setJsonResponse } from "../../../custom/contoh";

const getListBonusPeriod = async () => {
  const hasil = await Axios({
    url: `${baseUrlApi}/api/v2/listShowBnsPeriod`,
    method: 'GET',
  });

  const {data, status} = hasil;
  console.log({hasil});
  if(status === 200) {
    console.log("masuk if");
    return setJsonResponse(data);
  }
};

export default getListBonusPeriod;