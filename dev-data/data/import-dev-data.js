const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { MongoClient } = require('mongodb');
const Review = require('./../../models/reviewModel');
const Tour = require('./../../models/tourModel');
const User = require('./../../models/userModel');

dotenv.config({ path: './config.env' });
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

const client = new MongoClient(process.env.DATABASE, {
  useUnifiedTopology: true,
});

mongoose
  // .connect(process.env.DATABASE_LOCAL, {
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('DB connections successful'));

// READ JSON FILE
const reviews = JSON.parse(
  fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8'),
);
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'));
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));

// IMPORT DATA INTO COLLECTION
const importData = async () => {
  try {
    await Review.create(reviews);
    await Tour.create(tours);
    await User.create(users, { validateBeforeSave: false });
    // console.log('Data successfully loaded');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// DELETE ALL DATA FROM COLLECTIONS
const deleteData = async () => {
  try {
    await Tour.deleteMany();

    await Review.deleteMany();
    await Tour.deleteMany();
    await User.deleteMany();
    console.log('Data successfully deleted');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] == '--import') {
  importData();
} else if (process.argv[2] == '--delete') {
  deleteData();
}

// when you want to see what is happening the process.argv, you will have to console log it
// in the console, you will see an array of files printed
// to add a command into this array, you insert the command as for example --import
// so in this scenario, we will be deleting the data in our database using our api
// first we will be deleting the data already in the database, then import new data from a .json file
// so the steps go as the ones below

// console.log(process.argv);
// using cmd
// node dev-data/data/import-dev-data.js
// node dev-data/data/import-dev-data.js --delete
// node dev-data/data/import-dev-data.js --import
