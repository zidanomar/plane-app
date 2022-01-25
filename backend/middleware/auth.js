const jwt = require('jsonwebtoken');

function authentication(req, res, next) {
  let token;

  if (
    req.headers['x-auth-token'] &&
    req.headers['x-auth-token'].startsWith('Bearer')
  ) {
    token = req.headers['x-auth-token'].split(' ')[1];
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ msg: 'Token is not valid' });
  }
}

async function authorization(req, res, next) {
  let token;

  if (
    req.headers['x-auth-token'] &&
    req.headers['x-auth-token'].startsWith('Bearer')
  ) {
    token = req.headers['x-auth-action'].split(' ')[1];
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    if (decoded.role !== 'admin' || decoded.role !== 'company')
      return res.status(401).json({ msg: 'user is not authorized' });
  } catch (error) {
    res.status(400).json({ msg: 'Token is not valid' });
  }
}

async function adminAuthorization(req, res, next) {
  let token;

  if (
    req.headers['x-auth-token'] &&
    req.headers['x-auth-token'].startsWith('Bearer')
  ) {
    token = req.headers['x-auth-token'].split(' ')[1];
  }
  try {
    if (!token) return res.status(401).json({ msg: 'user is not enticated' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    if (decoded.role !== 'admin')
      return res.status(401).json({ msg: 'user is not authorized' });
    next();
  } catch (error) {
    res.status(400).json({ msg: 'Token is not valid' });
  }
}

async function companyAuthorization(req, res, next) {
  let token;

  if (
    req.headers['x-auth-token'] &&
    req.headers['x-auth-token'].startsWith('Bearer')
  ) {
    token = req.headers['x-auth-token'].split(' ')[1];
  }

  try {
    if (!token) return res.status(401).json({ msg: 'user is not enticated' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    if (decoded.role !== 'company')
      return res.status(401).json({ msg: 'user is not authorized' });
    next();
  } catch (error) {
    res.status(400).json({ msg: 'Token is not valid' });
  }
}

module.exports = {
  authentication,
  adminAuthorization,
  companyAuthorization,
};
