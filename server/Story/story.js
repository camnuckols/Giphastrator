const mongoose = require('mongoose');

const Story = new mongoose.Schema({
  title: { type: String, trim: true },
  story: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	shortUrl: String,
	statistics: Object
});

module.exports = mongoose.model('Story', Story);
