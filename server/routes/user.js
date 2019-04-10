const express = require('express');
const User = require('../models/user');
const bodyParser = require('body-parser');
const app = express();
const bcrypt = require('bcrypt');
const _ = require('underscore');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Get users.
app.get('/user', (req, res) => {
  let from = req.query.from || 0;
  from = Number(from);

  let limit = req.query.limit || 5;
  limit = Number(limit);

  // Busca los usuarios activos en la DB.
  User.find({ state: true }, 'name email state role google img')
    .limit(limit)
    .skip(from)
    .exec((err, users) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err
        });
      }

      // Obtengo el número de usuarios que están activos en la DB.
      User.count({ state: true }, (error, usersNumber) => {
        res.json({
          ok: true,
          total: usersNumber,
          users
        });
      });
    });
});

// Create user.
app.post('/user', (req, res) => {
  let body = req.body;

  let user = new User({
    name: body.name,
    email: body.email,
    password: bcrypt.hashSync(body.password, 10),
    role: body.role
  });

  user.save((err, userDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err
      });
    }

    res.json({
      ok: true,
      user: userDB
    });
  });
});

// Update user.
app.put('/user/:id', (req, res) => {
  let id = req.params.id;
  let body = _.pick(req.body, ['name', 'email', 'img', 'state', 'role']);

  User.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (error, userDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err
      });
    }

    res.json({
      ok: true,
      user: userDB
    });
  });
});

// Delete user.
app.delete('/user/:id', (req, res) => {
  let id = req.params.id;
  let body = {
    state: false
  };

  User.findByIdAndUpdate(id, body, (error, userUpdated) => {
    if (error) {
      return res.status(400).json({
        ok: false,
        error
      });
    }

    res.json({
      ok: true,
      user: userUpdated
    });
  });

  /* Eliminación directa del registro en la DB */
  // User.findByIdAndRemove(id, (error, userDeleted) => {
  //     if (error) {
  //       return res.status(400).json({
  //         ok: false,
  //         error
  //       });
  //     }

  //     if (!userDeleted) {
  //         return res.status(400).json({
  //             ok: false,
  //             error: {
  //                 message: "Usuario no encontrado"
  //             }
  //         });
  //     }

  //     res.json({
  //       ok: true,
  //       user: userDeleted
  //     });
  // });
});

module.exports = app;
