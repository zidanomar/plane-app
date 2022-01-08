const router = require('express').Router();

const authController = require('../controllers/authControllers');
const { authentication } = require('../middleware/auth');

router.post('/register', authController.registerUser);
router.post('/login', authController.login);
router.get('/', authentication, authController.userAuth);

module.exports = router;
