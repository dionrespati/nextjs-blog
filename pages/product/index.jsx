import React, {useState, useEffect} from 'react';
import ProductList from '../../components/product/productList';
import { useAppContext } from "../../context/app";

const dataPrd = [
  {productId: "01", productName: "Macbook Air M1", price: 14000000},
  {productId: "02", productName: "Macbook Pro M1", price: 20000000},
  /* {productId: "03", productName: "Lenovo ThinkPad X1", price: 16000000},
  {productId: "04", productName: "HP Pavilion X23", price: 13500000},
  {productId: "05", productName: "Asus Vivobook 13", price: 14500000},
  {productId: "06", productName: "Lenovo Yoga", price: 12000000}, */
];

const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


const index = () => {

  const {login, setLogin} = useAppContext();

  const [cart, setCart] = useState([]);
  const [totalItem, setIotalItem] = useState(0);
  const [totalHarga, setTotalHarga] = useState(0);

  useEffect(() => {
    //set total Item dan Harga
    let totQty = 0;
    let totHarga = 0;
    cart.forEach(x => {
      totQty += x.qty;
      totHarga += x.qty * x.price;
    });
    setIotalItem(totQty);
    setTotalHarga(totHarga);
    console.log("dipanggil useEffect Tot Harga/Qty")

    /* window.localStorage.setItem("data_obj", JSON.stringify(cart)); */
    /* const logStr = {
      username: "SDSSD",
      password: "dasdaf"
    };
    setLogin(logStr); */
  },[cart]);

  return (
    <div>
      <h2>Ini adalah halaman utama Produk Bekas</h2>
      {dataPrd.map((items) => {
        const {productId, productName, price} = items;
         return (
          <ProductList 
            key={productId}
            productId={productId}
            productName={productName}
            price={price}
            setCart={setCart}
            cart={cart}
          />
         );      
      })}
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th colSpan="5">List Produk</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>Kode</th>
                    <th>Nama</th>
                    <th>Qty</th>
                    <th>Harga</th>
                    <th>Sub Total</th>
                  </tr>
                  {/* cart && cart.map((el) => {
                    return (
                      <tr key={el.productId}>
                        <td align="center">{el.productId}</td>
                        <td>{el.productName}</td>
                        <td align="right"><button>-</button>{el.qty}<button>+</button></td>
                        <td align="right">{numberWithCommas(el.price)}</td>
                        <td align="right">{numberWithCommas(el.price * el.qty)}</td>
                      </tr>
                    );
                  }) */}
                  <tr>
                    <td colSpan="2">Total</td>
                    <td align="right">{numberWithCommas(totalItem)}</td>
                    <td>&nbsp;</td>
                    <td align="right">{numberWithCommas(totalHarga)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div>
      {<pre>
          {JSON.stringify(login, null, '\t')}
        </pre>}          
      </div>
    </div>  
  );
};

export default index;
