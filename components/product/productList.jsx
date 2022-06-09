import React from 'react';

const productList = (props) => {
  
  const {productId, productName, price, cart, setCart} = props;
  
  const addToCart = (id, nama, harga) => {
    const index = cart.findIndex(el => el.productId === id);
    if(index >= 0) {
      cart[index].qty += 1;
      setCart([...cart]);
    } else {
      setCart([
        ...cart,
        {
          productId: id,
          productName: nama,
          price: harga,
          qty: 1
        }
      ]);
    }
    /* let totalQty = 0;
    let totalHarga = 0;
    const jum = cart.length;
    if(jum === 0) {
      setCart([
        ...cart,
        {
          productId: id,
          productName: nama,
          price: harga,
          qty: 1
        }
      ]);
    } else {
      const isiArr = cart.forEach(el => {
        if(el.productId === id) {
          el.qty += 1;
        } else {
          setCart([
            ...cart,
            {
              productId: id,
              productName: nama,
              price: harga,
              qty: 1
            }
          ]);
        }
        //setCart([el]);
        totalQty += el.qty;
        totalHarga += el.qty * el.price;
        console.log({el});
      }); 
    }*/
    
    
  };
  
  return (
    <div className="flex">
      <h2 className="flex-auto text-xl font-semibold">{productName}</h2>
      <div className="text-xl font-semibold text-gray-500">
       Rp.{price}
      </div>
      <input type="button" name="addToCart" id="addToCart" value="Tambah" onClick={() => addToCart(productId, productName, price)} />
    </div>
  );
};

export default productList;
