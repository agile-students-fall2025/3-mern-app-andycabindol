const mongoose = require('mongoose');

const AboutSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    description: { type: String, required: true },
    picture: { type: String, required: true },
  },
  { collection: 'about' } // <-- important: exact collection name
);

module.exports = { About: mongoose.model('About', AboutSchema, 'about') }; // 3rd arg also pins collection
