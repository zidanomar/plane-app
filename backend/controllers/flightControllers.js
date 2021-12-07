const { Flight, Plane } = require('../database/models');
// create flight

// METHOD: POST
// PATH: /flight
// DESCRIPTION: create new flight
exports.addFlight = async (req, res) => {
  const { planeId, depature_date, arrival_date } = req.body;

  const second = 1000;
  const minute = 60;
  const hour = 60;

  // get flight duration in hour
  const depature = new Date(depature_date);
  const arrival = new Date(arrival_date);
  const getHour =
    (arrival.getTime() - depature.getTime()) / second / minute / hour;
  const duration = Math.round(getHour);

  try {
    const plane = await Plane.findOne({ where: { uuid: planeId } });
    // // set that only delivered plan could flight
    // if (!plane.isDelivered)
    //   throw { status: 404, message: 'plane is not ready!' };

    // const flight = await Flight.findOne({
    //   where: { plane_id: plane.id },
    // });
    // // set if plane is already in a flight
    // if (flight) throw { status: 404, message: 'plane are busy!' };

    const newFlight = await Flight.create({
      plane_id: plane.id,
      depature_date: depature.toISOString(),
      arrival_date: arrival.toISOString(),
      duration,
    });

    const flightResponse = await Flight.findOne({
      where: { uuid: newFlight.uuid },
      include: 'planeDetail',
    });

    res.status(200).json(flightResponse);
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
      where: { uuid: flightId },
      include: 'planeDetail',
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
  const { planeDetail, depature_date, arrival_date } = req.body;

  const second = 1000;
  const minute = 60;
  const hour = 60;

  // set flight time in hour
  const depature = new Date(depature_date);
  const arrival = new Date(arrival_date);
  const setHour =
    (arrival.getTime() - depature.getTime()) / second / minute / hour;
  const duration = Math.round(setHour);

  try {
    const plane = await Plane.findOne({ where: { uuid: planeDetail.uuid } });

    const updateFlight = await Flight.update(
      {
        plane_id: plane.id,
        arrival_date: arrival.toISOString(),
        depature_date: depature.toISOString(),
        duration,
      },
      {
        where: { uuid: flightId },
        returning: true,
        plain: true,
      }
    );

    const flightResponse = await Flight.findOne({
      where: { uuid: updateFlight[1].uuid },
      include: 'planeDetail',
    });
    console.log(flightResponse);

    res.status(200).json(flightResponse);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
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

    res.status(200).json(flightId);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};
