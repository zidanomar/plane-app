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
    console.error(error);
    res.status(error.status || 500).json({
      status: error.status || 500,
      message: error.message || 'some error acuired!',
    });
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
    res.status(error.status || 500).json({
      status: error.status || 500,
      message: error.message || 'some error acuired!',
    });
  }
};

// METHOD: POST
// PATH: /plane
// DETAILS: add new plane to list
exports.addPlane = async (req, res) => {
  const { customerId, name, aircraft_number, tail_number, isDelivered } =
    req.body;

  try {
    const customer = await Customer.findOne({ where: { uuid: customerId } });

    const newPlane = await Plane.create({
      name,
      aircraft_number,
      tail_number,
      customer_id: customer.id,
      isDelivered,
    });

    const planeResponse = await Plane.findOne({
      where: { uuid: newPlane.uuid },
      include: 'owner',
    });

    res.status(200).send(planeResponse);
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({
      status: error.status || 500,
      message: error.message || 'some error acuired!',
    });
  }
};

// METHOD: PATCH
// PATH: /plane/:planeId
// DETAILS: update specific plane details
exports.updatePlane = async (req, res) => {
  const { planeId } = req.params;
  const { name, aircraft_number, tail_number, owner, isDelivered } = req.body;
  let items;
  try {
    if (owner) {
      const customer = await Customer.findOne({ where: { uuid: owner.uuid } });

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
        aircraft_number: +aircraft_number,
        tail_number: +tail_number,
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

    const planeResponse = await Plane.findOne({
      where: { uuid: updatedPlane[1].uuid },
      include: 'owner',
    });

    res.status(200).send(planeResponse);
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({
      status: error.status || 500,
      message: error.message || 'some error acuired!',
    });
  }
};

// METHOD: DELETE
// PATH: /plane/:planeId
// DETAILS: delete specified plane
exports.deletePlaneById = async (req, res) => {
  const { planeId } = req.params;

  try {
    const plane = await Plane.destroy({ where: { uuid: planeId } });
    if (plane === 0) throw { status: 404, message: 'plane not found!' };

    res.status(200).json(planeId);
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({
      status: error.status || 500,
      message: error.message || 'some error acuired!',
    });
  }
};
