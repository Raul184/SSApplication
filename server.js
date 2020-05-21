const express = require('express');


const app = express()



app.get('/' , ( req , res ) => {
  return res.status(200).send('hello from the server side')
})

app.listen(3500 , () => console.log('yes'));