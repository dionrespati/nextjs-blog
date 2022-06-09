const handler = (req, res) => {
  res.status(200);
  res.json({
    errorCode: '0', 
    asem: [3,4,6],
    angka: 25,
    data:[
      {
        id: 1,       
        name: 'Home',
        path: '/',
        submenu: [],
      },
     /*  {
        id: 2,    
        name: 'About',
        path: '/about',
        submenu: [],
      }, */
      {
        id: 3,    
        name: 'Product',
        path: '/product',
        submenu: [
          {
            id: 31,        
            name: 'Beauty Care',
            path: '/product/1',
            submenu: []
          },
          {
            id: 32,       
            name: 'Health Care',
            path: '/product/2',
            submenu: []
          },
          {
            id: 33,        
            name: 'Fragance',
            path: '/product/3',
            submenu: []
          },
        ]
      },
      {
        id: 4,    
        name: 'Login/Register',
        path: '/login',
        submenu: [],
      },
      /* {
        id: 5,    
        name: 'To Do',
        path: '/todo2',
        submenu: [],
      },
      {
        id: 6,    
        name: 'Post',
        path: '/posts',
        submenu: [],
      }, */
    ]
  });
};
export default handler;