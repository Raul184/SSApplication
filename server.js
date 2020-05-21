const express = require('express');
// Router
const indexRoute = require('./routes/index');
const toursRouter = require('./routes/tour');

const app = express()

// Middlewares
app.use( express.json() )

// Routes
app.use( '/' , indexRoute )
app.use( '/api/v1/tours' , toursRouter )

app.listen(3500 , () => console.log('yes'));