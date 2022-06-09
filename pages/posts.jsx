import React, { useState, useEffect } from 'react';
import { useAppContext } from "../context/app";

const posts = () => {
  const {login} = useAppContext();
  const [isValid, setValid] = useState(0);
  const [post, setPost] = useState({});

  useEffect(() => {    
    const hasil = null;
    fetch('http://localhost:3000/api/member/list')
     .then(response => response.json())
     .then(data => {
      console.log('useEffect dipanggil api');
       if(data !== null) {
         setValid(1);
       }
       setPost(data)
     });
    
  },[isValid]);

  return (
    <>
      <div className="flex container p-2">
        <div className="bg-blue-200 w-2/4 mr-4 h-40 border-solid rounded-lg">
          <h2 className='text-left text-2xl'>Judul 1</h2>
          Author : Mr.x
          <article>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem quo, asperiores tenetur eligendi, delectus nobis neque quia maiores aliquid molestiae adipisci harum amet numquam hic error reprehenderit saepe. Temporibus, porro? Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, ipsa? Dicta itaque sit fugiat veniam, nisi nemo fugit? Aliquid modi qui veniam ad quas nobis placeat autem laboriosam culpa ipsum! Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet commodi doloribus illo voluptatum ab tempore aspernatur. Quidem mollitia facere sed quia? Tenetur, ducimus deserunt! Ab ipsam deleniti corrupti est. Architecto. Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur corporis dolor non obcaecati iure nulla fugit ratione officiis iste, sint mollitia tempore minus odio saepe nemo deleniti, nobis rem! Fuga!
          </article> 
        </div>
        <div className="bg-yellow-200 w-2/4 mr-4 h-40 overflow-auto">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptates, magnam! Tenetur molestiae reiciendis, distinctio facilis eius consectetur quidem praesentium laborum aliquam quas aliquid voluptas fugiat aperiam! Dicta aliquid quibusdam id.</div>
        <div className="bg-green-400 w-2/4 mr-4 h-40 overflow-auto">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum qui fugit cum architecto, ex quo nesciunt eligendi molestias soluta placeat fugiat minus explicabo ea rem officiis similique ipsa sit necessitatibus?</div>
      </div>
    </>
  );
};

export default posts;

