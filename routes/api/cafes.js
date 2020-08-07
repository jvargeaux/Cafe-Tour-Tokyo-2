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

  // Authenticate user
  // We don't want just anyone updating our precious cafes

  let id = req.body._id;
  console.log(id);

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
    imageUrls: req.body.imageUrls,
    visits: req.body.visits
  });

  if (id) {
    console.log("Replacing cafe.");

    Cafe.findOne({ _id: id }, (err, obj) => {
      if (err) {
        console.log(err);
      }
      else {
        newCafe._id = id;
        Cafe.replaceOne({ _id: id }, newCafe )
          .then(cafe => {
            console.log("Replaced cafe:");
            console.log(newCafe);
            res.status(204).json(cafe);
          })
          .catch(err => console.log(err));
      }
    })
      .catch(err => console.log(err));
  }
  else {
    console.log("Creating new cafe.");

    newCafe.save()
    .then(cafe => {
      console.log("Saved new cafe:");
      console.log(newCafe);
      res.status(201).json(cafe);
    })
    .catch(err => console.log(err));
  }

})

router.delete('/', (req, res) => {

  // Authenticate user
  // We don't want just anyone updating our precious cafes

  let id = req.body._id;
  console.log(id);

  if (id) {
    console.log("Deleting cafe.");

    Cafe.findOne({ _id: id }, (err, obj) => {
      if (err) {
        console.log(err);
      }
      else {
        Cafe.deleteOne({ _id: id }, (err) => {
          if (err) {
            console.log(err);
          }
          else {
            console.log("Deleted cafe with ID: " + id);
            res.status(202).json(id);
          }
        })
          .catch(err => console.log(err));
      }
    })
      .catch(err => console.log(err));
  }
  else {
    console.log("Didn't find ID. Can't delete.");
    res.status(400).json(id);
  }

})

module.exports = router;
