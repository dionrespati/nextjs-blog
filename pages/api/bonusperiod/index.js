import Axios from "axios";
import { baseUrlApi, setJsonResponse } from "../../../custom/contoh";

const getListBonusPeriod = async () => {
  return await Axios.get(`${baseUrlApi}/api/v2/listShowBnsPeriod`)
    .then(res => {
      const {data, status} = res;
        if(status === 200) {
          /* const { bnsperiod_prev, bnsperiod_now, date_only_now, endofdatebnsperiod} = arrayData[0];
          let endOfDate = parseInt(endofdatebnsperiod);
          
          if(date_only_now > endOfDate) {
            arrBns[0] = {value : bnsperiod_now, text : dateFormatName(bnsperiod_now)};
          } else {
            //console.log({bnsperiod_prev, bnsperiod_now})
            arrBns[0] = {value : bnsperiod_prev, text : dateFormatName(bnsperiod_prev)};
            arrBns[1] = {value : bnsperiod_now, text : dateFormatName(bnsperiod_now)};
          }    */

          return setJsonResponse(data);
        } 
    });
};

export default getListBonusPeriod;