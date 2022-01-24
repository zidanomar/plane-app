const router = require('express').Router();

const flightControllers = require('../controllers/flightControllers');
const { authorization } = require('../middleware/auth');

router.post('/', authorization, flightControllers.addFlight);
router.get('/', flightControllers.getAllFlights);

router.get('/:flightId', flightControllers.getFlightById);
router.patch('/:flightId', authorization, flightControllers.updateFlight);

router.delete(
  '/deleteMany',
  authorization,
  flightControllers.deleteManyFlights
);
router.delete('/:flightId', authorization, flightControllers.deleteFlight);

module.exports = router;
