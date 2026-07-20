const router = require('express').Router();
const fruitsVegetablesController = require('../controllers/frutasVerduras');
const { productValidationRules, validate } = require('../middleware/validate');

router.get('/', fruitsVegetablesController.getAll);
router.get('/:id', fruitsVegetablesController.getSingle);

router.post('/', productValidationRules(), validate, fruitsVegetablesController.createProduct);
router.put('/:id', productValidationRules(), validate, fruitsVegetablesController.updateProduct);

router.delete('/:id', fruitsVegetablesController.deleteProduct);

module.exports = router;