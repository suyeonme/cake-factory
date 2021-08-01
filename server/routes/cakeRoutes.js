const { Router } = require('express');
const cakeController = require('../controller/cakeController');
const { upload } = require('../middleware/cakeMiddleware');

const router = Router();

router.get('/collection', cakeController.cake_get);
router.post('/collection/add', upload, cakeController.cake_add_post);

module.exports = router;
