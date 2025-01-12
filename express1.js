const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const passport= require('./auth');
const mongodbURL=process.env.mongodbURL;
// Connect to MongoDB
mongoose.connect(mongodbURL)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB', err));

const app = express();
app.use(bodyParser.json());
//middileware function
app.use(passport.initialize());
const localAuthMiddleware=passport.authenticate('local',{session:false});


app.get('/daal', (req, res) => {
  const customaized_daal = {
    name: "daal makhni",
    spice: "hot",
    price: "500 rupees",
  };
  res.send(customaized_daal);
});

const personRoutes= require('./routes/personroutes');
const menuRoutes= require('./routes/menuroutes');
app.use('/person',personRoutes);
app.use('/menu' ,menuRoutes);

const PORT= process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Listening on port 3000');
});
