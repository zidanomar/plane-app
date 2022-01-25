const router = require('express').Router();

const companyController = require('../controllers/companyControllers');
const { adminAuthorization, authentication } = require('../middleware/auth');

router.post('/', adminAuthorization, companyController.addNewCompany);
router.get('/', companyController.getAllCompany);

router.get('/companyuser', authentication, companyController.getCompanyByUser);
router.get('/:companyId', companyController.getCompanyById);
router.patch('/:companyId', authentication, companyController.updateCompany);

router.delete(
  '/deleteMany',
  adminAuthorization,
  companyController.deleteManyCompany
);
router.delete(
  '/:companyId',
  adminAuthorization,
  companyController.deleteCompany
);

module.exports = router;
