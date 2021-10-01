import React from "react";
import Link from 'next/link';

const header = () => {
  return (
    <>
      <h1>Ini header</h1>
      <Link href="/main/about"><a>About</a></Link>
      <Link href="/posts"><a>Post</a></Link>	
      <Link href="/"><a>Tes</a></Link>
    </>
    
  );
};

export default header;