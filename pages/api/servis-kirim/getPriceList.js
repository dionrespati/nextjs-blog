import Axios from 'axios';
import { baseUrlApi, setJsonResponse } from "../../../custom/contoh";

const token = "cb386747fad6955d445ca1ad9e091d1e258e563d9516863e01e710c0f37d0ec8a70fa45ae8d51bf43d83fa6151abcf4c5267b62ltcCLRBuFJccH9U8ar0eaJbbVpli8BuyXBJq280w";

const getPriceList = async(param) => {

  const loccd = "BID06";
  if(param.whcd !== "WH001") {
    loccd = param.whcd;
  }

  const paramBody={ 
    token: token, 
    whcd: param.whcd, 
    loccd: loccd, 
    id_member: param.id_member, 
    jenis_alamat: param.jenis_alamat, 
    berat: String(param.berat), 
    harga_barang: String(param.harga),
    asuransi: "0"
  };

  return await Axios({
    //url: `${baseUrlApi}/api/v2/getPriceListOngkir`,
    url: "https://service-kurir.k-link.dev/api/feecourierOP2",
    method: 'POST',
    data: paramBody
  }).then((res) => {
    const {status, data} = res;
    
    if(status !== 200) {
      //return setJsonResponse(data);

      result = {
        errCode: "005",
        data: null,
        message: ""
      }
      return result;
    } 
    
    const {data:isidata} = data;
    const { response_kurir } = isidata;
    console.log({response_kurir});
    
    const available_kurir = response_kurir.filter(e => e.status === true);
    
    let list_cod = [];
    let list_non_cod = [];
    for(let i = 0; i < available_kurir.length; i++) {
      const { package:paket, courier, logo, is_cod } = available_kurir[i];
      let arrnew = {
        courier: courier,
        logo: logo,
      }

      if(paket.length > 0) {
        for(let j = 0; j < paket.length; j++) {
          if(paket[j].code === "COD") {
            arrnew = {
              ...arrnew,
              is_cod: "1",
              code: paket[j].code,
              service: paket[j].service,
              fee: paket[j].fee,
            }
            list_cod.push(arrnew);
          } else {
            arrnew = {
              ...arrnew,
              is_cod: "0",
              code: paket[j].code,
              service: paket[j].service,
              fee: paket[j].fee,
            }
            list_non_cod.push(arrnew);
          }
        }
      }
    }

    console.log({list_cod, list_non_cod});
  
    let result = {};
    result = {
      ...result,
      errCode: "000",
      data: {
        list_cod: list_cod,
        list_non_cod: list_non_cod
      },
      message: ""
    }
    return result;


  }).catch(function (error) {
    console.log(`masuk catch error`, error);
  });
}

export default getPriceList;