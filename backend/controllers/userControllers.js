const { User, Company } = require('../database/models');

// METHOD: GET
// PATH: /user
// DETAILS: get all user list
exports.getAllUser = async (req, res) => {
  try {
    const users = await User.findAll({ include: 'company' });

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
      include: 'company',
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
  try {
    const company = await Company.findOne({ where: { uuid: companyId } });
    if (!company) throw { status: 404, message: 'no company found' };

    const updatedUser = await User.update(
      { company_id: company.id },
      {
        where: { uuid: userId },
        include: 'company',
        returning: true,
        plain: true,
      }
    );

    const response = await User.findOne({
      where: { uuid: updatedUser[1].uuid },
      include: 'company',
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
