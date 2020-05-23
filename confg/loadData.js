const fs = require('fs');
const TourModel = require('../models/tours');

const tours = JSON.parse(fs.readFileSync( `${__dirname}/tours-simple.json` , 'utf-8'));

const importData = async () => {
  try {
    await TourModel.create( tours );
    console.log('Data loaded!');
  } 
  catch (error) {
    console.log(error);
  }
  process.exit()
}


const deleteData = async () => {
  try {
    await TourModel.deleteMany()
    console.log('Deleted');  
  } 
  catch (error) {
    console.log('Error');
  }
  process.exit()
}

if( process.argv[2] === '--import' ){
  importData()
}
else if( process.argv[2] === '--delete' ){
  deleteData()
}

// console.log(process.argv); + relative path + command