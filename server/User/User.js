const mongoose = require( 'mongoose' );

const User = new mongoose.Schema({
  given_name: { type: String },
  family_name: { type: String },
  email: { type: String },
  stories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Story' }],
  id: { type: String },
	favoriteStories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Story' }]
});

module.exports = mongoose.model( 'User', User );
