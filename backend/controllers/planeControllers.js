const { Plane, Company, User } = require('../database/models');

// METHOD: GET
// PATH: /plane
// DETAILS: get all plane list
exports.getPlaneList = async (req, res) => {
  try {
    const planes = await Plane.findAll({
      include: [
        { model: Company, as: 'owner' },
        {
          model: User,
          as: 'likedBy',
          attributes: ['uuid', 'username'],
        },
      ],
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
    const plane = await Plane.findOne({
      where: { uuid: planeId },
      include: [
        { model: Company, as: 'owner' },
        {
          model: User,
          as: 'likedBy',
          attributes: ['uuid', 'username'],
        },
      ],
    });

    if (!plane) return res.status(404).json({ message: 'No plane found' });

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
  const {
    companyId,
    name,
    flight_hour,
    aircraft_number,
    tail_number,
    isDelivered,
  } = req.body;

  try {
    const company = await Company.findOne({ where: { uuid: companyId } });

    const newPlane = await Plane.create({
      name,
      flight_hour: flight_hour || 100,
      aircraft_number,
      tail_number,
      company_id: company.id,
      isDelivered,
    });

    const planeResponse = await Plane.findOne({
      where: { uuid: newPlane.uuid },
      include: [
        { model: Company, as: 'owner' },
        {
          model: User,
          as: 'likedBy',
          attributes: ['uuid', 'username'],
        },
      ],
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
  const user = req.user;
  const {
    companyId,
    name,
    flight_hour,
    aircraft_number,
    tail_number,
    imgUrl,
    isDelivered,
  } = req.body;

  let items = {
    companyId,
    name,
    flight_hour,
    aircraft_number,
    tail_number,
    imgUrl,
    isDelivered,
  };

  try {
    // get company from authorized user
    const authorizedUser = await User.findOne({
      where: { uuid: user.uuid },
      include: 'company',
    });

    // get plane
    const plane = await Plane.findOne({
      where: { uuid: planeId },
      include: 'owner',
    });

    if (user.role === 'admin') {
      // check if plane's owner change
      if (companyId) {
        const company = await Company.findOne({ where: { uuid: companyId } });

        if (!company) throw { status: 404, message: 'Company Not Found' };

        items = {
          name,
          flight_hour,
          aircraft_number,
          tail_number,
          company_id: company.id,
          imgUrl,
          isDelivered,
        };
      }

      const updatedPlane = await Plane.update(items, {
        where: { uuid: planeId },
        returning: true,
        plain: true,
      });

      const planeResponse = await Plane.findOne({
        where: { uuid: updatedPlane[1].uuid },
        include: [
          { model: Company, as: 'owner' },
          {
            model: User,
            as: 'likedBy',
            attributes: ['uuid', 'username'],
          },
        ],
      });

      res.status(200).send(planeResponse);
    } else if (
      (user.role =
        'company' && authorizedUser.company.uuid === plane.owner.uuid)
    ) {
      const updatedPlane = await Plane.update(items, {
        where: { uuid: planeId },
        returning: true,
        plain: true,
      });

      const planeResponse = await Plane.findOne({
        where: { uuid: updatedPlane[1].uuid },
        include: [
          { model: Company, as: 'owner' },
          { model: User, as: 'likedBy' },
        ],
      });

      res.status(200).send(planeResponse);
    } else {
      throw { status: 401, message: 'You are not authorized for this action!' };
    }
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

// METHOD: DELETE
// PATH: /plane/deleteMany
// DETAILS: delete many planes
exports.deleteManyPlanes = async (req, res) => {
  const { selectedItems } = req.body;

  try {
    await Plane.destroy({
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
