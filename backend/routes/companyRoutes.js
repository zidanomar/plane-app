const router = require('express').Router();

const companyController = require('../controllers/companyControllers');
const { authorization } = require('../middleware/auth');

router.post('/', authorization, companyController.addNewCompany);
router.get('/', companyController.getAllCompany);

router.get('/:companyId', companyController.getCompanyById);
router.patch('/:companyId', companyController.updateCompany);

router.delete(
  '/deleteMany',
  authorization,
  companyController.deleteManyCompany
);
router.delete('/:companyId', authorization, companyController.deleteCompany);

module.exports = router;
