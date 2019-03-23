const express = require('express');
const bcrypt  = require('bcryptjs');
const config  = require('config');
const jwt     = require('jsonwebtoken');
const auth    = require('../../middleware/auth');
const router  = express.Router();


// User Model

const User = require('../../models/user');


// POST api/auth
// Authenticate user
// public access
router.post('/', (req, res) => {
  const { email, password } = req.body;


// Validation

if (!email | !password) {
    return res.status(400).json({ msg: 'Please complete all fields' });
}

// If user doesn't exist
// Use mongoose method findOne()
User.findOne({ email })
  .then(user => {
    if(!user) return res.status(400).json({ msg: `User doesnt exist` });

// Validate password
// See if password and hashed password is the same
  bcrypt.compare(password, user.password)
    .then(isMatch => {
      if(!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

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
    })
  })
});

// GET api/auth/user
// Get user data
// private
// select method to not return password
// return promise with user
router.get('/user', auth, (req, res) => {
  User.findById(req.user.id)
    .select('-password')
    .then(user => res.json(user));
});

module.exports = router;
