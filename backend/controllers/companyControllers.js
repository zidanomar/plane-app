const { Company, User, Plane } = require('../database/models');

// METHOD: POST
// PATH: /company
// DETAILS: create new company
exports.addNewCompany = async (req, res) => {
  const { name } = req.body;

  try {
    const newCompany = await Company.create({ name });

    const company = await Company.findOne({
      where: { uuid: newCompany.uuid },
      include: 'planes',
    });

    res.status(200).json(company);
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({
      status: error.status || 500,
      message: error.message || 'some error acuired!',
    });
  }
};

// METHOD: GET
// PATH: /company
// DETAILS: get all company
exports.getAllCompany = async (req, res) => {
  try {
    const companies = await Company.findAll({
      include: 'planes',
    });

    res.status(200).json(companies);
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({
      status: error.status || 500,
      message: error.message || 'some error acuired!',
    });
  }
};

// METHOD: GET
// PATH: /company/:companyId
// DETAILS: get specified company details
exports.getCompanyById = async (req, res) => {
  const { companyId } = req.params;

  try {
    const company = await Company.findOne({
      where: { uuid: companyId },
      include: 'planes',
    });

    if (!company) return res.status(404).json({ message: 'No customer found' });

    res.status(200).json(company);
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({
      status: error.status || 500,
      message: error.message || 'some error acuired!',
    });
  }
};

// METHOD: GET
// PATH: /plane/companyplanes
// DETAILS: get specified company's plane
exports.getCompanyByUser = async (req, res) => {
  const user = req.user;
  try {
    if (!user) throw { status: 404, message: 'Company Not Found' };
    const { company } = await User.findOne({
      where: { uuid: user.uuid },
      include: [
        {
          model: Company,
          as: 'company',
          include: [{ model: Plane, as: 'planes', include: 'flightLogs' }],
        },
      ],
    });

    res.status(200).json(company);
  } catch (error) {
    res.status(error.status || 500).json({
      status: error.status || 500,
      message: error.message || 'some error acuired!',
    });
  }
};

// METHOD: PATCH
// PATH: /company/:companyId
// DETAILS: update specified company details
exports.updateCompany = async (req, res) => {
  const { companyId } = req.params;
  const { name } = req.body;
  const user = req.user;

  try {
    const { company } = await User.findOne({
      where: { uuid: user.uuid },
      include: 'company',
    });
    if (user.role === 'admin' || company?.uuid === companyId) {
      const updatedCompany = await Company.update(
        { name },
        {
          where: { uuid: companyId },
          include: 'planes',
          returning: true,
          plain: false,
        }
      );

      if (updatedCompany[0] < 1)
        throw { status: 404, message: 'No Company Found With Specified Id' };

      res.status(200).json(updatedCompany[1][0]);
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
// PATH: /company/:companyId
// DETAILS: delete specified company
exports.deleteCompany = async (req, res) => {
  const { companyId } = req.params;

  try {
    const company = await Company.findOne({
      where: { uuid: companyId },
    });

    if (!company)
      throw { status: 404, message: 'No Company Found With Specified Id' };

    await Company.destroy({ where: { uuid: companyId } });

    res.status(200).json(companyId);
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({
      status: error.status || 500,
      message: error.message || 'some error acuired!',
    });
  }
};

// METHOD: DELETE
// PATH: /company/deleteMany
// DETAILS: delete many company
exports.deleteManyCompany = async (req, res) => {
  const { selectedItems } = req.body;
  try {
    await Company.destroy({
      where: { uuid: selectedItems },
    });

    res.status(200).json(`success deleted ${selectedItems.length} items!`);
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({
      status: error.status || 500,
      message: error.message || 'some error acuired!',
    });
  }
};
