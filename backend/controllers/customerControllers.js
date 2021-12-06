const { Op } = require('sequelize');

const { Customer } = require('../database/models');

// METHOD: POST
// PATH: /customer
// DETAILS: create new customer
exports.addNewCustomer = async (req, res) => {
  const { name } = req.body;

  try {
    // Check if customer with insensitive name case is already exist
    // const existingCustomer = await Customer.findAll({
    //   where: {
    //     name: {
    //       [Op.iLike]: name,
    //     },
    //   },
    // });

    // if (existingCustomer.length > 0) throw 'The customer already registered';

    const newCustomer = await Customer.create({ name });

    res.status(200).json(newCustomer);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
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
    console.log(error);
    res.status(500).send(error);
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
        returning: true,
        plain: true,
      }
    );

    res.status(200).json(updatedCustomer[1]);
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
