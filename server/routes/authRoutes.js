const { Router } = require('express');
// const cors = require('cors');
const authController = require('../controller/authController');

const router = Router();

router.get('/jwt_get', authController.jwt_get);
router.post('/signin', authController.signin_post);
router.post('/signup', authController.signup_post);
router.get('/signout', authController.signout_get);

module.exports = router;
