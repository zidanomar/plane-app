const router = require('express').Router();

const flightControllers = require('../controllers/flightControllers');
const { adminAuthorization } = require('../middleware/auth');

router.post('/', adminAuthorization, flightControllers.addFlight);
router.get('/', flightControllers.getAllFlights);

router.get('/:flightId', flightControllers.getFlightById);
router.patch('/:flightId', adminAuthorization, flightControllers.updateFlight);

router.delete(
  '/deleteMany',
  adminAuthorization,
  flightControllers.deleteManyFlights
);
router.delete('/:flightId', adminAuthorization, flightControllers.deleteFlight);

module.exports = router;
