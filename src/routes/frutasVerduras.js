const router = require('express').Router();
const frutasVerdurasController = require('../controllers/frutasVerduras');
const { productValidationRules, validate } = require('../middleware/validate');

router.get('/', frutasVerdurasController.getAll);
router.get('/:id', frutasVerdurasController.getSingle);

router.post('/', productValidationRules(), validate, frutasVerdurasController.createProduct);
router.put('/:id', productValidationRules(), validate, frutasVerdurasController.updateProduct);

router.delete('/:id', frutasVerdurasController.deleteProduct);

module.exports = router;