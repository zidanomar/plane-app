const { postLike } = require('../controllers/likeControllers');
const { authentication } = require('../middleware/auth');

const router = require('express').Router();

router.post('/', authentication, postLike);

module.exports = router;
