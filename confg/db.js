const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect( process.env.DB  , {
      useNewUrlParser: true ,
      useUnifiedTopology: true ,
      useCreateIndex: true ,
      useFindAndModify: false
    })
    console.log('MongoDB connected');
  } 
  catch (error) {
    console.log('Error connecting to DB' , error);  
    process.exit(1);
  }
}

module.exports = connectDB;

