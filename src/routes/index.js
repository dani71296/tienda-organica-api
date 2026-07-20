const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../../swagger.json');

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

router.get('/', (req, res) => {
    res.send('¡Welcome to the organics foods API!');
});
router.use('/fruits-vegetables', require('./frutasVerduras'));
router.use('/meats-dairy', require('./carnesLacteos'));

module.exports = router;