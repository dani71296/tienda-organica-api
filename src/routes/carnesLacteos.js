const router = require('express').Router();
const carnesLacteosController = require('../controllers/carnesLacteos');
const { productValidationRules, validate } = require('../middleware/validate');

router.get('/', carnesLacteosController.getAll);
router.get('/:id', carnesLacteosController.getSingle);


router.post('/', productValidationRules(), validate, carnesLacteosController.createProduct);
router.put('/:id', productValidationRules(), validate, carnesLacteosController.updateProduct);

router.delete('/:id', carnesLacteosController.deleteProduct);

module.exports = router;