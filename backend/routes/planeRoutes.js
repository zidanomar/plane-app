const router = require('express').Router();

// SETUP CONTROLLERS
const planeControllers = require('../controllers/planeControllers');
const { authentication, authorization } = require('../middleware/auth');

router.get('/', planeControllers.getPlaneList);
router.post('/', authorization, planeControllers.addPlane);

router.get('/:planeId', planeControllers.getPlaneById);
router.patch('/:planeId', planeControllers.updatePlane);

router.delete('/deleteMany', authorization, planeControllers.deleteManyPlanes);
router.delete('/:planeId', authorization, planeControllers.deletePlaneById);

module.exports = router;
