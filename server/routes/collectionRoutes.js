const { Router } = require('express');
const { requireAuth } = require('../middleware/authMiddleware');
const collectionController = require('../controller/collectionController');

const router = Router();

router.get('/collection', requireAuth, collectionController.collection_get);

module.exports = router;
