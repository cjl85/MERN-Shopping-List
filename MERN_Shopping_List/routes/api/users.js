const express = require('express');
const bcrypt  = require('bcryptjs');
const config  = require('config');
const jwt     = require('jsonwebtoken');
const router  = express.Router();

// User Model

const User = require('../../models/user');


// POST api/users
// Register new user
// public
router.post('/', (req, res) => {
  const { name, email, password } = req.body;


// Validation

if (!name || !email | !password) {
    return res.status(400).json({ msg: 'Please complete all fields' });
}

// If user exists
// Use mongoose method findOne()
User.findOne({ email })
  .then(user => {
    if(user) return res.status(400).json({ msg: 'User already exists'});

    const newUser = new User({
      name,
      email,
      password
    });

// Create salt & hash
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if(err) throw err;

      newUser.password = hash;

      newUser.save()
        .then(user => {

          jwt.sign(
            { id: user.id },
            config.get('jwtSecret'),
            (err, token) => {
              if(err) throw err;

              res.json({
                token,
                user: {
                  id: user.id,
                  name: user.name,
                  email: user.email
              }
            });
          }
        )
      });
    })
   })
  })
});
module.exports = router;
