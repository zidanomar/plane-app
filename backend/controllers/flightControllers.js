const { Flight, Plane } = require('../database/models');
// create flight

// METHOD: POST
// PATH: /flight
// DESCRIPTION: create new flight
exports.addFlight = async (req, res) => {
  const { planeId } = req.body;

  const second = 1000;
  const minute = 60;
  const hour = 60;

  // set dummy flight time
  const depatureDate = new Date('2021-12-05T04:50:00');
  const arrivalDate = new Date('2021-12-05T22:43:00');
  const getHour =
    (arrivalDate.getTime() - depatureDate.getTime()) / second / minute / hour;
  const duration = Math.round(getHour);
  console.log(typeof duration);

  try {
    const plane = await Plane.findOne({ where: { uuid: planeId } });

    const newFlight = await Flight.create({
      plane_id: plane.id,
      depature_date: depatureDate,
      arrival_date: arrivalDate,
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

  // set dummy flight time
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
    const deleteFlight = await Flight.findAll({ where: { id: flightId } });

    if (deleteFlight.length < 1)
      throw { status: 404, message: 'item not found' };

    await Flight.destroy({ where: { id: flightId } });

    res.status(200).json(deleteFlight);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};
