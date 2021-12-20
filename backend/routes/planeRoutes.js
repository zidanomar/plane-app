const router = require('express').Router();

// SETUP CONTROLLERS
const planeControllers = require('../controllers/planeControllers');

router.get('/', planeControllers.getPlaneList);
router.post('/', planeControllers.addPlane);

router.get('/:planeId', planeControllers.getPlaneById);
router.patch('/:planeId', planeControllers.updatePlane);

router.delete('/deleteMany', planeControllers.deleteManyPlanes);
router.delete('/:planeId', planeControllers.deletePlaneById);

module.exports = router;
