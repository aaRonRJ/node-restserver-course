// Port
process.env.PORT = process.env.PORT || 3000;

// Environment.
process.env.NODE_ENV = process.env.NODE_ENV || "dev";

// Fecha de expiración del token (60s * 60min * 24h * 30días).
process.env.EXPIRATION_TOKEN = 60 * 60 * 24 * 30;

// Seed de autenticación.
process.env.SEED_TOKEN = process.env.SEED_TOKEN || "seed-token";

// Url mongoDB.
const urlDB = process.env.NODE_ENV === "dev" ? "mongodb://localhost:27017/coffee" : process.env.MONGO_DB;
process.env.URL_DB = urlDB;