const express = require('express');
const router = express.Router();

const Cafe = require('../../models/Cafe');

router.get('/', (req, res) => {
  Cafe.find()
    .then(cafes => {
      res.set({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
      });
      res.json(cafes);
      // console.log(cafes);
    })
    .catch(err => next(err));
});

router.post('/', (req, res) => {
  const newCafe = new Cafe({
    name: req.body.name,
    city: req.body.city,
    ratings: {
      overall: req.body.ratings.overall,
      cleanliness: req.body.ratings.cleanliness,
      coffee: req.body.ratings.coffee,
      food: req.body.ratings.food,
      usability: req.body.ratings.usability,
      price: req.body.ratings.price
    },
    features: {
      wifi: req.body.features.wifi,
      seats: req.body.features.seats,
      water: req.body.features.water
    },
    location: {
      station: req.body.location.station,
      line: req.body.location.line,
      minsFromStation: req.body.location.minsFromStation
    },
    posts: {
      date: req.body.posts.date,
      visitRating: req.body.posts.visitRating,
      order: req.body.posts.order,
      textContent: req.body.posts.textContent
    }
  });

  newCafe.save()
    .then(cafe => res.json(cafe))
    .catch(err => console.log(err));
})

module.exports = router;
