import mongoose from 'mongoose';
// const mongoose = require('mongoose')

// mongoose.connect('mongodb://127.0.0.1:27017/FactoryDB').then(() => console.log('connected to db'))



async function main() {
  await mongoose.connect('mongodb://localhost:27017/admin', {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
  });
  console.log("Mongo connected");
}

main().catch(err => console.log(err));

export default main;
