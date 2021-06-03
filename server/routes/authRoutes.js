const { Router } = require('express');
// const cors = require('cors');
const authController = require('../controller/authController');

const router = Router();

router.get('/jwt_get', authController.jwt_get);
router.get('/signin', authController.signin_get);
router.get('/signup', authController.signup_get);
router.post('/signin', authController.signin_post);
router.post('/signup', authController.signup_post);

module.exports = router;
