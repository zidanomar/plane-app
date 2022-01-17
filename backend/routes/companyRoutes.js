const router = require('express').Router();

const companyController = require('../controllers/companyControllers');

router.post('/', companyController.addNewCompany);
router.get('/', companyController.getAllCompany);

router.get('/:companyId', companyController.getCompanyById);
router.patch('/:companyId', companyController.updateCompany);

router.delete('/deleteMany', companyController.deleteManyCompany);
router.delete('/:companyId', companyController.deleteCompany);

module.exports = router;
