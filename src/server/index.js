const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const { port, mongodbUrl } = require('../config/config'); // env

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const dbURI = mongodbUrl;

mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(result => {
    console.log(`Server is running on ${port}`);
    app.listen(3000);
  })
  .catch(err => console.log(err));

app.get('/', (req, res) => {
  res.send({ token: true });
});
