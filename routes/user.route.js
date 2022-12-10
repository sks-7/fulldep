const { Router } = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { userModel } = require('../models/user.model');

const userController = Router();

userController.post('/signup', (req, res) => {
  const { email, password, name } = req.body;
  console.log(email, name);
  bcrypt.hash(password, 5, async function (err, hash) {
    if (err) {
      res.send('Something went wrong, please try again');
    }
    const user = new userModel({
      email,
      password: hash,
      name,
    });
    try {
      await user.save();
      res.json({ msg: 'Signup successfully' });
    } catch (err) {
      console.log(err);
      res.send('Something went wrong, try later');
    }
  });
});

userController.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  console.log(user);
  const hash = user.password;
  bcrypt.compare(password, hash, function (err, result) {
    if (err) {
      res.send('Something went wrong, try later');
    }
    if (result) {
      const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);
      res.send({ msg: 'Login successful', token });
    } else {
      res.send('Invalid credentials');
    }
  });
});

module.exports = {
  userController,
};
