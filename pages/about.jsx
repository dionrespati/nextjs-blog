import React, { useState, useEffect, useContext } from 'react';
import { useAppContext } from "../context/app";

const about = () => {
  const {login, setLogin} = useAppContext();

  const [count, setCount] = useState(0);
  const [data, setData] = useState({});

  useEffect(() => {
    setCount(1);
    console.log(`Did mount ${count}`);
  },[]);

  useEffect(() => {
    const newData = {
      id: "1",
      nama: "Dion Respati"
    };
    setData({
      ...data,
      newData
    });
    console.log(`Did mount data ${data}`);
  },[]);

  return (
    <>
      <h1>I've rendered {count} times!</h1>
      <form action="">
        <fieldset>
          <legend>Test Form</legend>
          <div>Kota</div>
          <div>
            <input type="text" list="city-list" />
            <datalist id="city-list">
              <option value="Jakarta">Jakarta</option>
              <option value="Bandung">Bandung</option>
              <option value="Surabaya">Surabaya</option>
              <option value="Magelang">Magelang</option>
              <option value="Surakarta">Surakarta</option>
              <option value="Magetan">Magetan</option>
            </datalist>  
          </div>
          <div>kecamatan</div>
          <div>
            <input type="text" list="district-list" />
            <datalist id="district-list">
              <option value="Kebayoran Lama">Kebayoran Lama</option>
              <option value="Pesangrahan">Pesangrahan</option>
              <option value="Cipulir">Cipulir</option>
              <option value="Cipadu">Cipadu</option>
              <option value="Pecenongan">Pecenongan</option>
              <option value="Kebayoran Baru">Kebayoran Baru</option>
            </datalist>  
          </div>
          <div>Color</div>
          <div>
            <input type="color" name="color" />
          </div>
          <div>Progress</div>
          <div>
            <progress value="50" max="100">50%</progress>
          </div>
        </fieldset>
      </form>
      <h1>The details element</h1>
      <details>
        <summary>Epcot Center</summary>
        <p>Epcot is a theme park at Walt Disney World Resort featuring exciting attractions, international pavilions, award-winning fireworks and seasonal special events.</p>
      </details>
    </>
  )
};

export default about; 
