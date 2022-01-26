const router = require('express').Router();

// SETUP CONTROLLERS
const planeControllers = require('../controllers/planeControllers');
const {
  authentication,
  adminAuthorization,
  authorization,
} = require('../middleware/auth');

router.get('/', planeControllers.getPlaneList);
router.post('/', adminAuthorization, planeControllers.addPlane);

router.get('/:planeId', planeControllers.getPlaneById);
router.patch(
  '/:planeId',
  authentication,
  authorization,
  planeControllers.updatePlane
);

router.delete(
  '/deleteMany',
  adminAuthorization,
  planeControllers.deleteManyPlanes
);
router.delete(
  '/:planeId',
  adminAuthorization,
  planeControllers.deletePlaneById
);

module.exports = router;
