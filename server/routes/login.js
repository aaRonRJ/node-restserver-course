const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const User = require('../models/user');
const app = express();

app.post("/login", (req, response) => {
    const body = req.body;

    User.findOne({ email: body.email }, (error, userDB) => {
        if (error) {
            return response.status(500).json({
                ok: false,
                error
            });
        }

        if(!userDB) {
            return response.status(400).json({
                ok: false,
                error: {
                    message: "(Usuario) o contraseña incorrectos"
                }
            });
        } else {
            if (!bcrypt.compareSync(body.password, userDB.password)) {
                return response.status(400).json({
                    ok: false,
                    error: {
                        message: "Usuario o (contraseña) incorrectos"
                    }
                });
            }
        }

        let token = jwt.sign({
            user: userDB
        }, process.env.SEED_TOKEN, { expiresIn: process.env.EXPIRATION_TOKEN }); //Expirará en 30 días.

        response.json({
            ok: true,
            user: userDB,
            token
        });
    });
});

module.exports = app;
