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

const updateRekapTrans = (cart, login, pricecode) => {
  let totbv = 0;
  let totweight = 0;
  let totharga = 0;
  let totitem = 0;
  for(let i = 0; i < cart.length; i++) {
    totbv += cart[i].qty * cart[i].bv;

    if(login !== null && pricecode == "12W4") {
      totharga += cart[i].qty * cart[i].price_w;
    }

    if(login !== null && pricecode == "12E4") {
      totharga += cart[i].qty * cart[i].price_e;
    }

    if(login === null && pricecode == "12W4") {
      totharga += cart[i].qty * cart[i].price_cw;
    }

    if(login === null && pricecode == "12E4") {
      totharga += cart[i].qty * cart[i].price_ce;
    }
    totweight += cart[i].qty * cart[i].weight;
    totitem += cart[i].qty;
  }

  const newArrCart = {
    totalItem: totitem,
    totalWeight: parseFloat(totweight.toFixed(2)),
    totalHarga: totharga,
    totalBv: totbv
  };

  return newArrCart;
}

export {double, triple, currency_format, baseUrlApi, setJsonResponse, dateFormatName, updateRekapTrans};