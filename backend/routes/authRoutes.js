const router = require('express').Router();

const authController = require('../controllers/authControllers');
const { authentication, authorization } = require('../middleware/auth');

router.post('/register', authController.registerUser);
router.post('/login', authController.login);
router.get('/', authentication, authController.userAuth);
router.get('/admin', authentication, authorization, authController.userAuth);

module.exports = router;
