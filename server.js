const express = require('express');
const morgan = require('morgan');
// Router
const indexRoute = require('./routes/index');
const toursRouter = require('./routes/tour');
const usersRouter = require('./routes/user');
const reviewsRouter = require('./routes/review');

const app = express()

// Middlewares 
app.use( morgan('dev') )
app.use( express.json() )   // req.body

// Routes
app.use( '/' , indexRoute )
app.use( '/api/v1/tours' , toursRouter )
app.use( '/api/v1/users' , usersRouter )
app.use( '/api/v1/reviews' , reviewsRouter )

app.listen(3500 , () => console.log(3500));