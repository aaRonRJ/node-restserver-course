const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let validRoles = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} noes un role válido'
};

let Schema = mongoose.Schema;

let user = new Schema({
    name: { type: String, required: [true, 'El nombre es obligatorio'] },
    email: {
        type: String,
        required: [true, 'El email es obligatorio'],
        unique: true
    },
    password: { type: String, required: [true, 'El password es obligatorio'] },
    img: { type: String, required: false },
    role: { type: String, default: 'USER_ROLE', enum: validRoles },
    state: { type: Boolean, default: true },
    google: { type: Boolean, default: false }
});

// Sirve para eliminar el campo 'password' del objeto que se devuelve en la respuesta.
user.methods.toJSON = function() {
    let item = this;
    let itemObject = item.toObject();
    delete itemObject.password;

    return itemObject;
};

user.plugin(uniqueValidator, {
    message: 'El {PATH} debe de ser único'
});

module.exports = mongoose.model('User', user);