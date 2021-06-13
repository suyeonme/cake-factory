const { Router } = require('express');
const collectionController = require('../controller/collectionController');

const router = Router();

router.get('/collection', collectionController.collection_get);

module.exports = router;
