const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema({
  // item: {
  //   type: Buffer,
  // },
  title: {
    type: String,
  },
});

const Collection = mongoose.model('collection', collectionSchema);
module.exports = Collection;
