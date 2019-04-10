// Port
process.env.PORT = process.env.PORT || 3000;

// Environment.
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// Url mongoDB.
const urlDB = process.env.NODE_ENV === 'dev' ? 'mongodb://localhost:27017/coffee' : 'mongodb+srv://mongo_user:rKcuHfyJ18WYKyQu@cluster0-eeuzf.mongodb.net/coffee';
process.env.URL_DB = urlDB;