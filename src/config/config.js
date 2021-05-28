require('dotenv').config({
  path: '/Users/suyeonkang/playground/cake-factory/.env',
});

module.exports = {
  mongodbUrl: process.env.MONGODB_URL,
  port: process.env.PORT,
};
