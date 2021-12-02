const { Flight, Plane } = require('../database/models');
// create flight

// METHOD: POST
// PATH: /flight
// DESCRIPTION: create new flight
exports.addFlight = async (req, res) => {
  const { planeId, depatureDate, arrivalDate } = req.body;

  const second = 1000;
  const minute = 60;
  const hour = 60;

  // get flight duration in hour
  const depature = new Date(depatureDate);
  const arrival = new Date(arrivalDate);
  const getHour =
    (arrival.getTime() - depature.getTime()) / second / minute / hour;
  const duration = Math.round(getHour);

  try {
    const plane = await Plane.findOne({ where: { uuid: planeId } });
    // set that only delivered plan could flight
    if (!plane.isDelivered)
      throw { status: 404, message: 'plane is not ready!' };

    const flight = await Flight.findOne({
      where: { plane_id: plane.id },
    });
    // set if plane is already in a flight
    if (flight) throw { status: 404, message: 'plane are busy!' };

    const newFlight = await Flight.create({
      plane_id: plane.id,
      depature_date: depatureDate,
      arrival_date: depatureDate,
      duration,
    });

    res.status(200).json(newFlight);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
};
// get all flight

// METHOD: GET
// PATH: /flight
// DESCRIPTION: get all flight list
exports.getAllFlights = async (req, res) => {
  try {
    const flights = await Flight.findAll({ include: 'planeDetail' });

    res.status(200).json(flights);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
};
// get specified flight

// METHOD: GET
// PATH: /flight/:flightId
// DESCRIPTION : get specified flight details
exports.getFlightById = async (req, res) => {
  const { flightId } = req.params;
  try {
    const flight = await Flight.findAll({
      where: { id: flightId },
    });

    if (flight.length < 1) throw { status: 404, message: 'item not found' };

    res.status(200).json(flight);
  } catch (error) {
    res.status(500).send({ error });
  }
};
// update flight

// METHOD: PATCH
// PATH: /flight/:flightId
// DESCRIPTION: update specified flight details
exports.updateFlight = async (req, res) => {
  const { flightId } = req.params;
  const {
    planeId: plane_id,
    depatureDate: depature_date,
    arrivalDate: arrival_date,
  } = req.body;

  const second = 1000;
  const minute = 60;
  const hour = 60;

  // set flight time in hour
  const setDepatureDate = new Date(depature_date);
  const setArrivalDate = new Date(arrival_date);
  const setHour =
    (setArrivalDate.getTime() - setDepatureDate.getTime()) /
    second /
    minute /
    hour;
  const duration = Math.round(setHour);

  try {
    const updateFlight = await Flight.update(
      {
        plane_id,
        arrival_date: setArrivalDate,
        depature_date: setDepatureDate,
        duration,
      },
      {
        where: { id: flightId },
        returning: true,
        plain: true,
      }
    );

    res.status(200).json(updateFlight[1]);
  } catch (error) {
    res.status(500).json({ message: error.parent.routine });
  }
};
// delete flight

// METHOD: DELETE
// PATH: /flight/:flightId
// DESCRIPTION: Delete specified flight
exports.deleteFlight = async (req, res) => {
  const { flightId } = req.params;
  try {
    await Flight.destroy({ where: { uuid: flightId } });

    res.status(200).json(`flight with uuid ${flightId} has beed deleted!`);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};
