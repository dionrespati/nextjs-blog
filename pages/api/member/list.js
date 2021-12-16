const handler = (req, res) => {
  res.status(200);
  res.json({
    errorCode: '0', 
    data:[
      {id: 1,nama: 'Dion Respati'},
      {id: 2,nama: 'Toto Widianto Adi'},
      {id: 3,nama: 'Vera Yunita'}
    ]
  });
};
export default handler;