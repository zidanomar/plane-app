const router = require('express').Router();

const customerController = require('../controllers/customerControllers');

router.post('/', customerController.addNewCustomer);
router.get('/', customerController.getCustomers);

router.get('/:customerId', customerController.getCustomerById);
router.patch('/:customerId', customerController.updateCustomer);
router.delete('/:customerId', customerController.deleteCustomer);

module.exports = router;
