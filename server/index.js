const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');

const { port, mongodbUrl } = require('./config/config'); // env
const authRoutes = require('./routes/authRoutes');

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
// app.use((req, res, next) => {
//   // handle CORS error
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
//   res.setHeader(
//     'Access-Control-Allow-Methods',
//     'GET, POST, OPTIONS, PUT, PATCH, DELETE'
//   );
//   res.setHeader(
//     'Access-Control-Allow-Headers',
//     'X-Requested-With,content-type'
//   );
//   res.setHeader('Access-Control-Allow-Credentials', true);
//   next();
// });

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
// app.get('*', checkUser);
// app.get('/', (req, res) => res.render('home'));
app.use(authRoutes);
// app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'));
