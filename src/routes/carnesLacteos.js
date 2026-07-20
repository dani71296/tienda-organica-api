const router = require('express').Router();
const meatsDairyController = require('../controllers/carnesLacteos');
const { productValidationRules, validate } = require('../middleware/validate');

router.get('/', meatsDairyController.getAll);
router.get('/:id', meatsDairyController.getSingle);

router.post('/', productValidationRules(), validate, meatsDairyController.createProduct);
router.put('/:id', productValidationRules(), validate, meatsDairyController.updateProduct);

router.delete('/:id', meatsDairyController.deleteProduct);

module.exports = router;