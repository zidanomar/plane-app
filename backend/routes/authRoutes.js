const router = require('express').Router();

const authController = require('../controllers/authControllers');
const {
  authentication,
  adminAuthorization,
  companyAuthorization,
} = require('../middleware/auth');

router.post('/register', authController.registerUser);
router.post('/login', authController.login);
router.get('/', authentication, authController.userAuth);
router.get(
  '/admin',
  authentication,
  adminAuthorization,
  authController.userAuth
);
router.get(
  '/company',
  authentication,
  companyAuthorization,
  authController.userAuth
);

module.exports = router;
