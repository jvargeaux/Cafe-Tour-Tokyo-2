const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

const app = express();

dotenv.config();

// Middleware
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// GET
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});


// ===============
// --- MONGODB ---
// ===============

// DB Connect String
const dbString = require('../config/keys').mongoURI;
console.log(dbString);

// Connect to DB
mongoose.connect(dbString, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected.'))
  .catch(err => console.log(err));


// ROUTES
app.use('/api/cafes', require('../routes/api/cafes'));
app.use('/api/posts', require('../routes/api/posts'));
app.use('/api/users', require('../routes/api/users'));
app.use('/login', require('../routes/login'));
app.use('/register', require('../routes/api/users'));
app.use('/dashboard', require('../routes/dashboard'));

app.use(express.static(path.join(__dirname, '../client/dist/')));
// app.get('/', function(req,res) {
//    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
// });


const port = process.env.PORT || 5000;
console.log("mode:", process.env.NODE_ENV);

app.listen(port, () => console.log(`Server running on port ${port}.`));
