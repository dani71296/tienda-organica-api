const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../../swagger.json');

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

router.get('/', (req, res) => {
    res.send('¡Welcome to the organics foods API!');
});
router.use('/frutas-verduras', require('./frutasVerduras'));
router.use('/carnes-lacteos', require('./carnesLacteos'));

module.exports = router;