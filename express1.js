const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const mongodbURL=process.env.mongodbURL;
// Connect to MongoDB
mongoose.connect(mongodbURL)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB', err));

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Welcome to my hotel.......How can I help you?');
});

app.get('/chicken', (req, res) => {
  res.send('Sure sir! I would love to serve you chicken.');
});

app.get('/daal', (req, res) => {
  const customaized_daal = {
    name: "daal makhni",
    spice: "hot",
    price: "500 rupees",
  };
  res.send(customaized_daal);
});

app.get('/soup', (req, res) => {
  res.send('Sure sir! I would love to serve you Korean soup.');
});

app.get('/noodles', (req, res) => {
  res.send('Sure sir! I would love to serve you Chinese noodles.');
});


const personRoutes= require('./routes/personroutes');
app.use('/person',personRoutes);
const menuRoutes= require('./routes/menuroutes');
app.use('/menu',menuRoutes);

const PORT= process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Listening on port 3000');
});
