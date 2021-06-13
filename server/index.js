const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');

const { port, mongodbUrl } = require('./config/config'); // env
const authRoutes = require('./routes/authRoutes');
const collectionRoutes = require('./routes/collectionRoutes');
const { auth, checkUser } = require('./middleware/authMiddleware');

const app = express();

// middleware
app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// database connection
const dbURI = mongodbUrl;
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(result => {
    console.log(`Server is running on ${port}`);
    app.listen(port || 3000);
  })
  .catch(err => console.log(err));

// routes
// app.get('*', auth);
app.get('*', checkUser);
app.use(authRoutes);
app.use(collectionRoutes);
