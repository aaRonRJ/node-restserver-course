// Port
process.env.PORT = process.env.PORT || 3000;

// Environment.
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// Url mongoDB.
const urlDB = process.env.NODE_ENV === 'dev' ? 'mongodb://localhost:27017/coffee' : process.env.MONGO_DB;
process.env.URL_DB = urlDB;