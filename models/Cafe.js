const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const CafeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  city: {
    type: String
  },
  ratings: {
    type: {
      overall: Number,
      cleanliness: Number,
      coffee: Number,
      food: Number,
      usability: Number,
      price: Number
    }
  },
  features: {
    type: {
      wifi: Boolean,
      seats: Number,
      water: Boolean
    }
  },
  location: {
    type: {
      station: String,
      line: String,
      minsFromStation: Number
    }
  },
  imageUrls: {
    type: [String]
  },
  visits: {
    type: [{
      date: String,
      rating: Number,
      order: String,
      textContent: String
    }]
  }
});

module.exports = Cafe = mongoose.model('Cafes', CafeSchema);
