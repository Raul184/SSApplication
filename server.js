const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const db = require('./confg/db');
// Errors
const AppErrors = require('./utils/AppErrors');
const globalErrorsHandler = require('./GlobalErrorsHandler/ErrorsHandler');
// Router
const toursRouter = require('./routes/tour');
const usersRouter = require('./routes/user');
const reviewsRouter = require('./routes/review');

process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

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
app.use( '/api/v1/tours' , toursRouter )
app.use( '/api/v1/users' , usersRouter )
app.use( '/api/v1/reviews' , reviewsRouter )

app.all( '*' , ( req , res , next ) => {
  next( new AppErrors ('Sorry pal , this address is off the hook' , 404 ))
})

// Global Error Handler Middleware
app.use( globalErrorsHandler )


const port = process.env.PORT || 3500; 
app.listen( port , () => console.log( process.env.PORT , process.env.NODE_ENV ));

// Listener
process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
