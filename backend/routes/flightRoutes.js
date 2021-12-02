const router = require('express').Router();

const flightControllers = require('../controllers/flightControllers');

router.post('/', flightControllers.addFlight);
router.get('/', flightControllers.getAllFlights);

router.get('/:flightId', flightControllers.getFlightById);
router.patch('/:flightId', flightControllers.updateFlight);
router.delete('/:flightId', flightControllers.deleteFlight);

module.exports = router;
