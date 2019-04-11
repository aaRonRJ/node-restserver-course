require('./config/config');
const mongoose = require('mongoose');
const app = require('./routes'); // Import API routes.

// Conexión con la base de datos.
mongoose.connect(process.env.URL_DB, { useNewUrlParser: true,
useCreateIndex: true })
    .then(() => console.log('Base de datos Online'))
    .catch(error => console.log(error));

app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto: ', process.env.PORT);
});