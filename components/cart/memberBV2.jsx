import React, { memo } from 'react';
import { useAppContext } from '../../context/app';

function MemberBv2() {
  const { login } = useAppContext();
  console.log('komponen MemberBV2 rendered..');

  const gantiNama = (e) => {
    const nilai = e.target.value;
    /* setCart({
      ...cart,
      namaTes: nilai,
    }); */
  };

  return (
    <>
      <div>MemberBv2</div>
      <input type="text" onChange={gantiNama} />
    </>
  );
}

export default memo(MemberBv2);
