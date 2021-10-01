import React, { useState, useEffect } from 'react';

const posts = () => {
  const [isValid, setValid] = useState(0);

  useEffect(() => {    
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({
        title: 'foo',
        body: 'bar',
        userId: 1,
      }), headers: {
        'Content-type': 'application/json; charset=UTF-8',
       },
    }).then((response) => response.json());
    setValid(10); 
  },[]);

  return (
    <div>
      This is post user, please stop
      Status {isValid}
    </div>
  );
};

export default posts;
