const mongoose = require( 'mongoose' );

const User = new mongoose.Schema({
  given_name: { type: String },
  family_name: { type: String },
  email: { type: String },
  stories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Story' }],
  id: { type: String }
});

module.exports = mongoose.model( 'User', User );
