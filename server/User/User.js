const mongoose = require('mongoose');

const User = new mongoose.Schema({
  fname: { type: String, required: true, trim: true },
  lname: { type: String, required: true, trim: true },
  username: { type: String, required: true, trim: true, unique: true},
  password: { type: String, required: true },
  email: { type: String, required: true, trim: true, unique: true }
});

module.exports = mongoose.model('User', User);
