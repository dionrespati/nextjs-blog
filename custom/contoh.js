const double = (n) => n * 2;
const triple = (n) => n * 3;
const currency_format = (n) => parseInt(n).toLocaleString();
const baseUrlApi = 'https://www.k-net.co.id';

const setJsonResponse = (data) => {
  const {response, arrayData, message } = data;
  let result = {};
  if(response === "true") {
    result = {
      ...result,
      errCode: "000",
      data: arrayData,
      message: message
    }
  } else {
    result = {
      ...result,
      errCode: "001",
      data: null,
      message: message
    }
  }

  return result;
}

const dateFormatName = (param) => {
   const arrayBulan = ["", "Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
   const isi = param.split("-");
   const thn = isi[0];
   const bln = parseInt(isi[1]);
   const blnNama = arrayBulan[bln];
   return blnNama + " " + thn;
}

export {double, triple, currency_format, baseUrlApi, setJsonResponse, dateFormatName};