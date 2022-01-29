const {
  getAllUser,
  getUserById,
  updateUser,
  getUsersLikedPlanes,
} = require('../controllers/userControllers');
const { authentication, adminAuthorization } = require('../middleware/auth');

const router = require('express').Router();

router.get('/', authentication, adminAuthorization, getAllUser);

router.get('/planes', authentication, getUsersLikedPlanes);

router.get('/:userId', authentication, adminAuthorization, getUserById);
router.patch('/:userId', authentication, adminAuthorization, updateUser);

module.exports = router;
