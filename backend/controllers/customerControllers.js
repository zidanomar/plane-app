const { Customer } = require('../database/models');

// METHOD: POST
// PATH: /customer
// DETAILS: create new customer
exports.addNewCustomer = async (req, res) => {
  const { name } = req.body;

  try {
    const newCustomer = await Customer.create({ name }, { include: 'planes' });
    const customer = await Customer.findOne({
      where: { uuid: newCustomer.uuid },
      include: 'planes',
    });

    res.status(200).json(customer);
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({
      status: error.status || 500,
      message: error.message || 'some error acuired!',
    });
  }
};

// METHOD: GET
// PATH: /customer
// DETAILS: get all customers
exports.getCustomers = async (req, res) => {
  try {
    const customers = await Customer.findAll({
      include: 'planes',
    });

    res.status(200).json(customers);
  } catch (error) {
    res.status(500).send({ error });
  }
};

// METHOD: GET
// PATH: /customer/:customerId
// DETAILS: get specified customer details
exports.getCustomerById = async (req, res) => {
  const { customerId } = req.params;

  try {
    const customer = await Customer.findAll({ where: { id: customerId } });

    if (customer.length < 1)
      return res.status(404).json({ message: 'No customer found' });

    res.status(200).json(customer);
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({
      status: error.status || 500,
      message: error.message || 'some error acuired!',
    });
  }
};

// METHOD: PATCH
// PATH: /customer/:customerId
// DETAILS: update specified customer details
exports.updateCustomer = async (req, res) => {
  const { customerId } = req.params;
  const { name } = req.body;

  try {
    const updatedCustomer = await Customer.update(
      { name },
      {
        where: { uuid: customerId },
        include: 'planes',
        returning: true,
        plain: true,
      }
    );
    const customer = await Customer.findOne({
      where: { uuid: updatedCustomer[1].uuid },
      include: 'planes',
    });

    res.status(200).json(customer);
  } catch (error) {
    res.status(500).send({ error });
  }
};

// METHOD: DELETE
// PATH: /customer/:customerId
// DETAILS: delete specified customer
exports.deleteCustomer = async (req, res) => {
  const { customerId } = req.params;

  try {
    await Customer.destroy({ where: { uuid: customerId } });

    res.status(200).json(customerId);
  } catch (error) {
    res.status(500).send({ error });
  }
};
