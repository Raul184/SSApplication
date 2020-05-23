const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const db = require('./confg/db');
// Router
const indexRoute = require('./routes/index');
const toursRouter = require('./routes/tour');
const usersRouter = require('./routes/user');
const reviewsRouter = require('./routes/review');

dotenv.config({ 
  path: './config.env'
})

// Backend ON
const app = express()
db();

// Middlewares 
if(process.env.NODE_ENV === 'development'){
  app.use( morgan('dev') )
}
app.use( express.json() )                         // req.body
app.use( express.static(`${__dirname}/public`))   // Serve Static Files

// Routes
app.use( '/' , indexRoute )
app.use( '/api/v1/tours' , toursRouter )
app.use( '/api/v1/users' , usersRouter )
app.use( '/api/v1/reviews' , reviewsRouter )



const port = process.env.PORT || 3500; 
app.listen( port , () => console.log(process.env.PORT));