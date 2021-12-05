const { Plane, Customer } = require('../database/models');

// METHOD: GET
// PATH: /plane
// DETAILS: get all plane list
exports.getPlaneList = async (req, res) => {
  try {
    const planes = await Plane.findAll({
      include: 'owner',
    });

    res.status(200).json(planes);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
};

// METHOD: GET
// PATH: /plane/:planeId
// DETAILS: get specific plane details
exports.getPlaneById = async (req, res) => {
  const { planeId } = req.params;
  try {
    const plane = await Plane.findAll({ where: { id: planeId } });

    if (plane.length < 1)
      return res.status(404).json({ message: 'No plane found' });

    res.status(200).json(plane);
  } catch (error) {
    res.status(500).send({ error });
  }
};

// METHOD: POST
// PATH: /plane
// DETAILS: add new plane to list
exports.addPlane = async (req, res) => {
  const {
    customerId,
    name,
    aircraftNumber: aircraft_number,
    tailNumber: tail_number,
    isDelivered,
  } = req.body;

  try {
    const customer = await Customer.findOne({ where: { uuid: customerId } });

    const newPlane = await Plane.create({
      name,
      aircraft_number,
      tail_number,
      customer_id: customer.id,
      isDelivered,
    });

    res.status(200).send(newPlane);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
};

// METHOD: PATCH
// PATH: /plane/:planeId
// DETAILS: update specific plane details
exports.updatePlane = async (req, res) => {
  const { planeId } = req.params;
  const { name, aircraft_number, tail_number, customer_id, isDelivered } =
    req.body;
  let items;
  try {
    if (customer_id) {
      const customer = await Customer.findOne({ where: { uuid: customer_id } });

      if (!customer) throw { status: 404, message: 'User Not Found' };

      items = {
        name,
        aircraft_number,
        tail_number,
        customer_id: customer.id,
        isDelivered,
      };
    } else {
      items = {
        name,
        aircraft_number,
        tail_number,
        isDelivered,
      };
    }
    const updatedPlane = await Plane.update(
      {
        ...items,
      },
      {
        where: { uuid: planeId },
        returning: true,
        plain: true,
      }
    );

    res.status(200).send(updatedPlane[1]);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

// METHOD: DELETE
// PATH: /plane/:planeId
// DETAILS: delete specified plane
exports.deletePlaneById = async (req, res) => {
  const { planeId } = req.params;

  try {
    const plane = await Plane.findAll({ where: { id: planeId } });

    if (plane.length < 1) throw 'No plane found with that specified id';

    await Plane.destroy({ where: { id: planeId } });

    console.log(plane.length);
    res.status(200).json(plane);
  } catch (error) {
    res.status(500).send({ error });
  }
};
