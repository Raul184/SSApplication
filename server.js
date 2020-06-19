const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');
// //CORS
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "http://localhost:4000");
//   res.header("Access-Control-Allow-Credentials", "true");
//   res.header("Access-Control-Allow-Headers", "Origin , Content-Type , Authorization, x-id , Content-Length , X-Requested-With , x-auth-token");
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//   next();
// });
const db = process.env.DATABASE;

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => console.log('DB connection successful!'));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
