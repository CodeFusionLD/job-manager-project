const mongoose = require('mongoose');
const Position = require('../models/Position.model');

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/job-ninja';



mongoose
  .connect(MONGO_URI)
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);

  //  return Position.deleteMany({}); 
  })
  .then( (response) => {
    console.log(response);

    return Position.insertMany(positions);
  })
  .then(positionsFromDB => {
    console.log(`Created ${positionsFromDB.length} positions`);

  
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error("Error connecting to DB: ", err);
  });
