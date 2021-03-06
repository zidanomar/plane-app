const { Flight, Plane } = require('../database/models');
// create flight

// METHOD: POST
// PATH: /flight
// DESCRIPTION: create new flight
exports.addFlight = async (req, res) => {
  const { planeId, depature_date, arrival_date } = req.body;

  const second = 1000;
  const minute = 60;
  const hour = 60 * minute * second;

  // get flight duration in hour
  const depature = new Date(depature_date);
  const arrival = new Date(arrival_date);
  const getHour = (arrival.getTime() - depature.getTime()) / hour;
  const duration = Math.round(getHour);

  try {
    const plane = await Plane.findOne({ where: { uuid: planeId } });
    if (!plane)
      throw { status: 404, message: 'No Plane Found With Specified Id' };

    const flight = await Flight.findAll({ where: { plane_id: plane.id } });

    if (flight.length > 0) {
      const lastFlight = flight[flight.length - 1].arrival_date.getTime();
      const recentFlight = depature;
      const flightGap = (recentFlight - lastFlight) / hour;

      if (flightGap < 72) throw { status: 404, message: 'Plane are busy' };
    }

    const newFlight = await Flight.create({
      plane_id: plane.id,
      depature_date: depature.toISOString(),
      arrival_date: arrival.toISOString(),
      duration,
    });

    const updatePlane = await Plane.update(
      {
        flight_hour: plane.flight_hour + duration,
      },
      {
        where: { uuid: planeId },
        returning: true,
        plain: true,
      }
    );

    const flightResponse = await Flight.findOne({
      where: { uuid: newFlight.uuid },
      include: 'planeDetail',
    });

    res.status(200).json(flightResponse);
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({
      status: error.status || 500,
      message: error.message || 'some error acuired!',
    });
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
    console.error(error);
    res.status(error.status || 500).json({
      status: error.status || 500,
      message: error.message || 'some error acuired!',
    });
  }
};

// get specified flight

// METHOD: GET
// PATH: /flight/:flightId
// DESCRIPTION : get specified flight details
exports.getFlightById = async (req, res) => {
  const { flightId } = req.params;
  try {
    const flight = await Flight.findOne({
      where: { uuid: flightId },
      include: 'planeDetail',
    });

    if (!flight)
      throw { status: 404, message: 'No Flight Found With Specified Id' };

    res.status(200).json(flight);
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({
      status: error.status || 500,
      message: error.message || 'some error acuired!',
    });
  }
};
// update flight

// METHOD: PATCH
// PATH: /flight/:flightId
// DESCRIPTION: update specified flight details
exports.updateFlight = async (req, res) => {
  const { flightId } = req.params;
  const { planeId, depature_date, arrival_date } = req.body;

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
    const plane = await Plane.findOne({ where: { uuid: planeId } });

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

    res.status(200).json(flightResponse);
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({
      status: error.status || 500,
      message: error.message || 'some error acuired!',
    });
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
    res.status(error.status || 500).json({
      status: error.status || 500,
      message: error.message || 'some error acuired!',
    });
  }
};

// METHOD: DELETE
// PATH: /customer/deleteMany
// DETAILS: delete many flights
exports.deleteManyFlights = async (req, res) => {
  const { selectedItems } = req.body;

  try {
    await Flight.destroy({
      where: { uuid: selectedItems },
    });

    res.status(200).json(`success deleted ${selectedItems.length} items!`);
  } catch (error) {
    res.status(error.status || 500).json({
      status: error.status || 500,
      message: error.message || 'some error acuired!',
    });
  }
};
