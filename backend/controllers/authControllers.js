const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { UserAuth, User, Role, Customer } = require('../database/models');

// METHOD: POST
// PATH: /auth
// DETAILS: create new customer
exports.registerUser = async (req, res) => {
  const {
    name,
    surename,
    email,
    gender,
    dateOfBirth,
    username,
    password,
    role,
  } = req.body;

  let roleId;

  try {
    // check existing email and username
    const existingEmail = await User.findOne({
      where: { email: email },
    });
    if (existingEmail) throw { status: 409, message: 'email already exist' };

    const existingUsername = await User.findOne({
      where: { username: username },
    });
    if (existingUsername)
      throw { status: 409, message: 'username already exist' };

    // Set user role
    const userRole = await Role.findOne({
      where: { role: 'user' },
    });
    roleId = userRole.id;

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      surename,
      email,
      username,
      gender,
      dateOfBirth,
    });

    const newUserAuth = await UserAuth.create({
      passwordHash,
      role_id: roleId,
      user_id: newUser.id,
    });

    const getUser = await UserAuth.findOne({
      where: { id: newUserAuth.id },
      include: [
        {
          model: User,
          as: 'userDetail',
          attributes: ['name', 'email', 'username'],
        },
        { model: Role, as: 'roleDetail', attributes: ['role'] },
      ],
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });
    const token = jwt.sign(
      {
        uuid: getUser.uuid,
        username: getUser.userDetail.username,
        name: getUser.userDetail.name,
        email: getUser.userDetail.email,
        role: getUser.roleDetail.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '1h',
      }
    );
    if (!token) throw { status: 500, message: 'can not generate token' };

    res.status(200).json(token);
  } catch (error) {
    res.status(error.status || 500).json({
      status: error.status || 500,
      message: error.message || 'some error acuired!',
    });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({
      where: { email: email },
      include: ['auth'],
    });
    if (!user) throw { status: 403, message: 'invalid credential' };

    const userAuth = await UserAuth.findOne({
      where: { user_id: user.id },
      include: ['userDetail', 'roleDetail'],
    });

    const passwordIsMatch = await bcrypt.compare(
      password,
      userAuth.passwordHash
    );
    if (!passwordIsMatch) throw { status: 403, message: 'invalid credential' };

    const token = jwt.sign(
      {
        uuid: userAuth.userDetail.uuid,
        username: userAuth.userDetail.username,
        name: userAuth.userDetail.name,
        email: userAuth.userDetail.email,
        role: userAuth.roleDetail.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '1h',
      }
    );

    res.status(200).json(token);
  } catch (error) {
    res.status(error.status || 500).json({
      status: error.status || 500,
      message: error.message || 'some error acuired!',
    });
  }
};

exports.userAuth = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    res.status(error.status || 500).json({
      status: error.status || 500,
      message: error.message || 'some error acuired!',
    });
  }
};
