const { User, UserAuth, Company, Role, Plane } = require('../database/models');

// METHOD: GET
// PATH: /user
// DETAILS: get all user list
exports.getAllUser = async (req, res) => {
  try {
    const users = await User.findAll({
      include: [
        { model: Company, as: 'company' },
        {
          model: UserAuth,
          as: 'auth',
          attributes: { exclude: ['uuid'] },
          include: [{ model: Role, as: 'roleDetail', attributes: ['role'] }],
        },
      ],
    });

    if (!users)
      throw { status: 404, message: 'no user found with specified id' };

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({
      status: error.status || 500,
      message: error.message || 'some error acuired!',
    });
  }
};

// METHOD: GET
// PATH: /user/:userId
// DETAILS: get user by id
exports.getUserById = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findOne({
      where: { uuid: userId },
      include: [
        { model: Company, as: 'company' },
        {
          model: UserAuth,
          as: 'auth',
          attributes: { exclude: ['uuid'] },
          include: [{ model: Role, as: 'roleDetail', attributes: ['role'] }],
        },
      ],
    });

    if (!user)
      throw { status: 404, message: 'no user found with specified id' };

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({
      status: error.status || 500,
      message: error.message || 'some error acuired!',
    });
  }
};

// METHOD: PATCH
// PATH: /user/userId
// DETAILS: update user
exports.updateUser = async (req, res) => {
  const { userId } = req.params;
  const { companyId } = req.body;

  let company_id = null;
  try {
    // check if user exist
    const existingUser = await User.findOne({ where: { uuid: userId } });
    if (!existingUser)
      throw { status: 404, message: 'no user found with specified id' };
    // get company_id if companyId exists
    if (companyId) {
      const company = await Company.findOne({ where: { uuid: companyId } });
      if (!company) throw { status: 404, message: 'company not found' };
      company_id = company.id;
    }
    // get role_id
    const role = await Role.findOne({
      where: { role: companyId ? 'company' : 'user' },
    });

    // update affilated company for user
    const updatedUser = await User.update(
      { company_id },
      { where: { uuid: userId }, returning: true, plain: true }
    );

    // get user id
    const user = await User.findOne({
      where: { uuid: updatedUser[1].uuid },
      include: [
        { model: Company, as: 'company' },
        {
          model: UserAuth,
          as: 'auth',
          attributes: { exclude: ['uuid'] },
          include: [{ model: Role, as: 'roleDetail', attributes: ['role'] }],
        },
      ],
    });

    // update user authorization
    await UserAuth.update(
      { role_id: role.id },
      { where: { user_id: user.id } }
    );

    const response = await User.findOne({
      where: { uuid: updatedUser[1].uuid },
      include: [
        { model: Company, as: 'company' },
        {
          model: UserAuth,
          as: 'auth',
          attributes: { exclude: ['uuid'] },
          include: [{ model: Role, as: 'roleDetail', attributes: ['role'] }],
        },
      ],
    });

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({
      status: error.status || 500,
      message: error.message || 'some error acuired!',
    });
  }
};

// METHOD: GET
// PATH: /user/planes
// DETAILS: get user by id
exports.getUsersLikedPlanes = async (req, res) => {
  const user = req.user;

  try {
    const response = await User.findOne({
      where: { uuid: user.uuid },
      include: [
        { model: Company, as: 'company' },
        {
          model: Plane,
          as: 'likedPlanes',
          attributes: { exclude: ['isDelivered'] },
          through: { attributes: [] },
          include: 'owner',
        },
      ],
    });

    if (!user)
      throw { status: 404, message: 'no user found with specified id' };

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({
      status: error.status || 500,
      message: error.message || 'some error acuired!',
    });
  }
};
